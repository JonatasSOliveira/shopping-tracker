import { isSecret } from "@/decorators/presentation/Secret";
import { isRequired } from "@/decorators/validation/Required";
import { BaseDTO } from "@/dtos/Base";
import React from "react";
import { useForm, Controller, DefaultValues, Path } from "react-hook-form";
import { Text, TextInput, View, Button } from "react-native";

interface FormProps<T extends BaseDTO<any>> {
  data: T;
  onSubmit: (data: T) => void;
}

export const Form = <T extends BaseDTO<any>>({
  data,
  onSubmit,
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
    }[] = [];

    for (const key of Reflect.ownKeys(data)) {
      if (
        typeof key === "string" &&
        !key.startsWith("_") &&
        !key.startsWith("#")
      ) {
        const required = isRequired(data, key);
        const secret = isSecret(data, key);
        fields.push({
          key,
          label: data.getLabel(key),
          required,
          secret,
        });
      }
    }

    return fields;
  };

  const fields = getFormFields(data);

  return (
    <View>
      {fields.map(({ key, label, required, secret }) => (
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
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
              />
            )}
          />
        </View>
      ))}
      <Button
        title="Salvar"
        onPress={handleSubmit((formData) => {
          data.updateDataFromObject(formData);
          onSubmit(data);
        })}
      />
    </View>
  );
};
