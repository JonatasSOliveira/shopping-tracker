import { View, Button, Alert } from 'react-native';
import { useEffect } from 'react'
import { User } from "@models/User"

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Button title="Abrir Scanner" onPress={() => navigation.navigate('Scanner')} />
    </View>
  );
}