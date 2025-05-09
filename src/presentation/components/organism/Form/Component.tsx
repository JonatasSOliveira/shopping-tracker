import { isSecret } from "@/decorators/presentation/Secret";
import { isEmail } from "@/decorators/validation/Email";
import { isRequired } from "@/decorators/validation/Required";
import { BaseDTO } from "@/dtos/Base";
import React from "react";
import { useForm, Controller, DefaultValues, Path } from "react-hook-form";
import { Text, TextInput, View, Button } from "react-native";

interface FormProps<T extends BaseDTO<any>> {
  data: T;
  onSubmit: (data: T) => void;
  saveButtonText?: string;
}

export const Form = <T extends BaseDTO<any>>({
  data,
  onSubmit,
  saveButtonText = "Salvar",
}: FormProps<T>) => {
  const { control, handleSubmit } = useForm<T>({
    defaultValues: data as DefaultValues<T>,
  });

  const getFormFields = (data: T) => {
    const fields: {
      key: string;
      label: string;
      required: boolean;
      secret: boolean;
      isEmail: boolean;
    }[] = [];

    for (const key of Reflect.ownKeys(data)) {
      if (
        typeof key === "string" &&
        !key.startsWith("_") &&
        !key.startsWith("#")
      ) {
        const required = isRequired(data, key);
        const secret = isSecret(data, key);
        const email = isEmail(data, key);
        fields.push({
          key,
          label: data.getLabel(key),
          required,
          secret,
          isEmail: email,
        });
      }
    }

    return fields;
  };

  const fields = getFormFields(data);

  return (
    <View>
      {fields.map(({ key, label, required, secret, isEmail: isEmail }) => (
        <View key={key}>
          <Text>{label}</Text>
          <Controller
            control={control}
            name={key as Path<T>}
            rules={{ required }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={typeof value === "string" ? value : ""}
                onChangeText={onChange}
                placeholder={label}
                secureTextEntry={secret}
                keyboardType={isEmail ? "email-address" : "default"}
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
              />
            )}
          />
        </View>
      ))}
      <Button
        title={saveButtonText}
        onPress={handleSubmit((formData) => {
          data.updateDataFromObject(formData);
          onSubmit(data);
        })}
      />
    </View>
  );
};
