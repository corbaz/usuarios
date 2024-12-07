import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/Button';
import { Text } from '../components/Text';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Usuarios</Text>
      <Button
        text="Cerrar Sesión"
        onPress={handleLogout}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});
