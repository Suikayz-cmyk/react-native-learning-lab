import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';

import * as ImagePicker from 'expo-image-picker';

const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Nama minimal 3 karakter')
    .required('Nama wajib diisi'),

  email: Yup.string()
    .email('Format email tidak valid')
    .required('Email wajib diisi'),

  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Nomor hanya angka')
    .min(10, 'Nomor terlalu pendek')
    .required('Nomor HP wajib diisi'),

  password: Yup.string()
    .min(6, 'Password minimal 6 karakter')
    .required('Password wajib diisi'),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password')],
      'Password tidak sama'
    )
    .required('Konfirmasi password wajib'),
});

export default function RegisterScreen({ navigation }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      profileImage: '',
    },

    validationSchema: registerSchema,

    onSubmit: (values) => {
      console.log('Register Success:', values);

      Alert.alert(
        'Sukses',
        'Akun berhasil dibuat!'
      );

      navigation.navigate('Login');
    },
  });
const pickImage = async () => {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      'Permission Denied',
      'Izinkan akses galeri terlebih dahulu.'
    );
    return;
  }

  const result =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

  if (!result.canceled) {
    const imageUri = result.assets[0].uri;

    formik.setFieldValue(
      'profileImage',
      imageUri
    );
  }
};

  return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={
      Platform.OS === 'ios'
        ? 'padding'
        : 'height'
    }
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TouchableOpacity
        style={styles.imagePicker}
        onPress={pickImage}
      >
        {formik.values.profileImage ? (
          <Image
            source={{
              uri: formik.values.profileImage,
            }}
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.imageText}>
            Choose Profile Photo
          </Text>
        )}
      </TouchableOpacity>

      <FormInput
        label="Full Name"
        placeholder="Enter your name"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
        error={formik.errors.name}
        touched={formik.touched.name}
      />

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
        label="Phone Number"
        placeholder="Enter phone number"
        keyboardType="numeric"
        value={formik.values.phone}
        onChangeText={formik.handleChange('phone')}
        onBlur={formik.handleBlur('phone')}
        error={formik.errors.phone}
        touched={formik.touched.phone}
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

      <FormInput
        label="Confirm Password"
        placeholder="Repeat password"
        secureTextEntry
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        onBlur={formik.handleBlur('confirmPassword')}
        error={formik.errors.confirmPassword}
        touched={formik.touched.confirmPassword}
      />

      <TouchableOpacity
        style={[
          styles.button,
          !formik.isValid &&
            styles.buttonDisabled
        ]}
        disabled={!formik.isValid}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.link}>
          Already have account? Login
        </Text>
      </TouchableOpacity>
          </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
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
    marginBottom: 22,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    overflow: 'hidden',
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  imageText: {
    color: '#aaa',
    textAlign: 'center',
    paddingHorizontal: 10,
    fontSize: 12,
  },

  button: {
    backgroundColor: '#00b894',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
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