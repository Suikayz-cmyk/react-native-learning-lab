import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.title}>
          Login Success
        </Text>

        <Text style={styles.subtitle}>
          Welcome to Form Input App
        </Text>

        <Text style={styles.description}>
          You have successfully entered
          the Home Screen.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.replace('Login')
          }
        >
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2c2c2c',
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    color: '#4c8bf5',
    fontSize: 16,
    marginBottom: 12,
  },

  description: {
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },

  button: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});