import { View, Alert } from "react-native";
import React from "react";
import { ServiceFacade } from "@/application/ServiceFacade";
import { Form } from "@/components/Form/Component";
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
