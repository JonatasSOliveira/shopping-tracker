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
    const fields: { [key: string]: string } = {};
    for (const key of Object.keys(data)) {
      const isRequired = Reflect.getMetadata("required", data, key);
      if (isRequired) {
        fields[key] = "required";
      }
    }
    return fields;
  };

  const fields = getFormFields(data);

  return (
    <View>
      {Object.keys(fields).map((field) => (
        <View key={field}>
          <Text>{data.getLabel(field)}</Text>
          <Controller
            control={control}
            name={field as Path<T>}
            rules={{ required: fields[field] === "required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={typeof value === "string" ? value : ""}
                onChangeText={onChange}
                placeholder={field}
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
