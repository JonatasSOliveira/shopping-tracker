import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import StackRoutes from './src/presentation/routes/StackRoutes'

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <StatusBar style="auto" />
      <StackRoutes />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
