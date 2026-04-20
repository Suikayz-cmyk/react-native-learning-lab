import { View, Text, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <FormInput
        label="Email"
        placeholder="Enter your email"
      />

      <FormInput
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        error="Password terlalu pendek"
        touched={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },
});