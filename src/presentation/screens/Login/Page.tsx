import { View, Alert } from "react-native";
import React from "react";
import { Form } from "@/components/organism/Form/Component";
import { SignInRequestDTO } from "@/dtos/request/SignIn";

export default function LoginPage() {
  const handleSubmit = (data: SignInRequestDTO) => {
    Alert.alert("Login", JSON.stringify(data));
  };

  return (
    <View>
      <Form data={new SignInRequestDTO()} onSubmit={handleSubmit} />
    </View>
  );
}
