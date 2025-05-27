import { Alert, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Form } from "@/components/organism/Form/Component";
import { SignInRequestDTO } from "@/dtos/auth/request/SignIn";
import { RootStackParamList } from "@/routes/RootStackParamList";
import { RoutePaths } from "@/routes/RoutePaths";
import { StackNavigationProp } from "@react-navigation/stack";
import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { useAuth } from "hooks/useAuth";
import { AppLayout } from "@/components/template/AppLayout/Component";

type LoginPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RoutePaths.Login
>;

type LoginProps = {
  navigation: LoginPageNavigationProp;
};

const authService = ServiceFacadeProvider.getCloud().getAuthService();

const LoginPage = ({ navigation }: LoginProps) => {
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
    <AppLayout>
      <Form
        data={new SignInRequestDTO()}
        onSubmit={handleSubmit}
        saveButtonText="Entrar"
      />
      <TouchableOpacity onPress={handleSignUpRedirect}>
        <Text className="color-blue-600">Novo? Cadastre-se</Text>
      </TouchableOpacity>
    </AppLayout>
  );
};

export default LoginPage;
