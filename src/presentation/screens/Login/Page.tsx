import { View, Alert, Button } from "react-native";
import React from "react";
import { Form } from "@/components/organism/Form/Component";
import { SignInRequestDTO } from "@/dtos/auth/request/SignIn";
import { RootStackParamList } from "@/routes/RootStackParamList";
import { RoutePaths } from "@/routes/RoutePaths";
import { StackNavigationProp } from "@react-navigation/stack";

type LoginPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.Login
>;

type LoginProps = {
  navigation: LoginPageNavigationProp;
};

export default function LoginPage({ navigation }: LoginProps) {
  const handleSubmit = (data: SignInRequestDTO) => {
    Alert.alert("Login", JSON.stringify(data));
  };

  const handleSignUpRedirect = () => navigation.navigate(RoutePaths.SignUp);

  return (
    <View>
      <Form data={new SignInRequestDTO()} onSubmit={handleSubmit} />
      <Button title="Novo? Cadastre-se" onPress={handleSignUpRedirect} />
    </View>
  );
}
