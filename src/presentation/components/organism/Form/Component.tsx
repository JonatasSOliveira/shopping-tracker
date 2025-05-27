import { isReadonly } from "@/decorators/presentation/Readonly";
import { isSecret } from "@/decorators/presentation/Secret";
import { isEmail } from "@/decorators/validation/Email";
import { isRequired } from "@/decorators/validation/Required";
import { BaseDTO } from "@/dtos/Base";
import React from "react";
import { useForm, Controller, DefaultValues, Path } from "react-hook-form";
import {
  Text,
  TextInput,
  View,
  Button,
  KeyboardTypeOptions,
} from "react-native";

interface FormProps<T extends BaseDTO<any>> {
  data: T;
  onSubmit: (data: T) => void;
  saveButtonText?: string;
  onCancel?: () => void;
}

interface Field {
  key: string;
  label: string;
  required: boolean;
  secret: boolean;
  isEmail: boolean;
  isReadonly: boolean;
}

export const Form = <T extends BaseDTO<any>>({
  data,
  onSubmit,
  saveButtonText = "Salvar",
  onCancel,
}: FormProps<T>) => {
  const { control, handleSubmit } = useForm<T>({
    defaultValues: data as DefaultValues<T>,
  });

  const getFormFields = (data: T) => {
    const fields: Field[] = [];

    for (const key of Reflect.ownKeys(data)) {
      if (
        typeof key === "string" &&
        !key.startsWith("_") &&
        !key.startsWith("#")
      ) {
        const required = isRequired(data, key);
        const secret = isSecret(data, key);
        const email = isEmail(data, key);
        const readonly = isReadonly(data, key);
        fields.push({
          key,
          label: data.getLabel(key),
          required,
          secret,
          isEmail: email,
          isReadonly: readonly,
        });
      }
    }

    return fields;
  };

  const getKeyboardType = (field: Field, value: any): KeyboardTypeOptions => {
    if (typeof value == "number") {
      return "numeric";
    }

    if (field.isEmail) {
      return "email-address";
    }

    return "default";
  };

  const handleFormSubmit = handleSubmit((formData) => {
    data.updateDataFromObject(formData);
    onSubmit(data);
  });

  const fields = getFormFields(data);

  return (
    <View className="w-full flex flex-col gap-4">
      {fields.map((field) => (
        <View key={field.key} className="flex flex-col gap-1">
          <Text>{field.label}</Text>
          <Controller
            control={control}
            name={field.key as Path<T>}
            rules={{ required: field.required }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={typeof value === "string" ? value : String(value)}
                onChangeText={onChange}
                placeholder={field.label}
                secureTextEntry={field.secret}
                keyboardType={getKeyboardType(field, value)}
                editable={!field.isReadonly}
                className={`border-2 py-2 pl-4 pr-4 rounded-md ${
                  field.isReadonly
                    ? "border-gray-300 bg-gray-100 text-gray-800"
                    : "border-slate-400 bg-white text-black"
                }`}
              />
            )}
          />
        </View>
      ))}
      <Button title={saveButtonText} onPress={handleFormSubmit} />
      {onCancel && (
        <Button
          title="Cancelar"
          onPress={() => {
            onCancel();
          }}
        />
      )}
    </View>
  );
};
