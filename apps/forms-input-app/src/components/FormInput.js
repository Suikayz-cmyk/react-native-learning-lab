import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function FormInput({
  label,
  error,
  touched,
  ...props
}) {
  const showError = touched && error;

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          showError && styles.inputError
        ]}
        placeholderTextColor="#777"
        {...props}
      />

      {showError && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },

  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },

  input: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
  },

  inputError: {
    borderColor: '#ff4d4d',
  },

  errorText: {
    color: '#ff4d4d',
    marginTop: 6,
    fontSize: 13,
  },
});