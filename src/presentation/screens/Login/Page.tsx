import { View, Alert, Button } from "react-native";
import React from "react";
import { Form } from "@/components/organism/Form/Component";
import { SignInRequestDTO } from "@/dtos/auth/request/SignIn";
import { RootStackParamList } from "@/routes/RootStackParamList";
import { RoutePaths } from "@/routes/RoutePaths";
import { StackNavigationProp } from "@react-navigation/stack";
import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { useAuth } from "hooks/useAuth";

type LoginPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.Login
>;

type LoginProps = {
  navigation: LoginPageNavigationProp;
};

const authService = ServiceFacadeProvider.getCloud().getAuthService();

export default function LoginPage({ navigation }: LoginProps) {
  const { refreshSession } = useAuth();

  const handleSubmit = async (data: SignInRequestDTO) => {
    try {
      await authService.signIn(data);
      await refreshSession();
    } catch (_) {
      Alert.alert("Login", "Usuário ou senha inválidos");
    }
  };

  const handleSignUpRedirect = () => navigation.navigate(RoutePaths.SignUp);

  return (
    <View>
      <Form
        data={new SignInRequestDTO()}
        onSubmit={handleSubmit}
        saveButtonText="Entrar"
      />
      <Button title="Novo? Cadastre-se" onPress={handleSignUpRedirect} />
    </View>
  );
}
