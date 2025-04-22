import { View } from "react-native";
import React from "react";
import { Form } from "@/components/organism/Form/Component";
import { SignUpRequestDTO } from "@/dtos/auth/request/SignUp";
import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";

const authService = ServiceFacadeProvider.getCloud().getAuthService();

export default function SignUpPage() {
  const handleSubmit = async (data: SignUpRequestDTO) => {
    await authService.signUp(data);
  };

  return (
    <View>
      <Form
        data={new SignUpRequestDTO()}
        onSubmit={(data) => handleSubmit(data)}
      />
    </View>
  );
}
