import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen({ setIsLoggedIn, navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>

      <View style={styles.form}>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsLoggedIn(true)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Belum punya akun? Register
        </Text>

      </View>

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#f5f5f5"
  },

  title:{
    fontSize:28,
    fontWeight:"bold",
    marginBottom:20
  },

  form:{
    width:"80%",
    backgroundColor:"#fff",
    padding:20,
    borderRadius:10,
    elevation:3
  },

  input:{
    borderWidth:1,
    borderColor:"#ccc",
    padding:12,
    borderRadius:8,
    marginBottom:15
  },

  button:{
    backgroundColor:"#007bff",
    padding:14,
    borderRadius:8,
    alignItems:"center"
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  },

  link:{
    marginTop:15,
    textAlign:"center",
    color:"#007bff"
  }

});