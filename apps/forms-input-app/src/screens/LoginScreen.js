import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import FormInput from '../components/FormInput';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Format email tidak valid')
    .required('Email wajib diisi'),

  password: Yup.string()
    .min(6, 'Password minimal 6 karakter')
    .required('Password wajib diisi'),
});

export default function LoginScreen({ navigation }) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: loginSchema,

    onSubmit: (values) => {
      console.log('Login Success:', values);

      navigation.navigate('Home');
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <FormInput
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        error={formik.errors.email}
        touched={formik.touched.email}
      />

      <FormInput
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        error={formik.errors.password}
        touched={formik.touched.password}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.link}>
          Don't have account? Register
        </Text>
      </TouchableOpacity>
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
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  button: {
    backgroundColor: '#4c8bf5',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  link: {
    color: '#4c8bf5',
    textAlign: 'center',
    marginTop: 18,
  },
});