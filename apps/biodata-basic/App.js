// Import komponen yang dibutuhkan
// StatusBar untuk atur warna status bar
// SafeAreaView agar tidak kena notch
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';

export default function App() {

  // Data biodata ditampilkan dengan map()
  const biodata = [
    { label: "Nama", value: "Muhammad Prayogo Pangestu" },
    { label: "NIM", value: "2410501046" },
    { label: "Prodi", value: "D3 Sistem Informasi" },
    { label: "Angkatan", value: "2024" },
  ];

  // State untuk tampil/sembunyikan bio
  const [showBio, setShowBio] = useState(true);

  // Data skill ditampilkan dalam list angka 
  const skills = ["Web Development (Html & CSS)", "Database Design (MySQL)", "Basic Programming (C Language)"];

  // State untuk mode dark dan light
  const [darkMode, setDarkMode] = useState(false);

  // Tema warna berdasarkan mode agar lebih konsisten 
  const theme = {
    bg: darkMode ? '#121212' : '#f2f4f7',
    card: darkMode ? '#1e1e1e' : '#ffffff',
    border: darkMode ? '#333' : '#ddd',
    text: darkMode ? '#ffffff' : '#000000',
    box: darkMode ? '#2a2a2a' : '#eaf2ff',
    buttonBio: darkMode ? '#3b82f6' : '#2563eb',
  };
  
  return (
    <>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>

        {/* ScrollView supaya bisa discroll kalau konten panjang */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
         <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>

            {/* Menampilkan foto profil dari folder assets */}
            <Image 
              source={require('./assets/Foto.jpg')}
              style={[
                styles.profileImage,
                {
                  borderWidth: 3,
                  borderColor: theme.border,
                }
              ]}
            />

            <Text style={[styles.title, { color: theme.text }]}>Profil</Text>

            {/* Menampilkan biodata secara dinamis dengan map() */}
            {biodata.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.label, { color: theme.text}]}>{item.label}</Text>
                <Text style={[styles.colon, { color: theme.text}]}>:</Text>
                <Text style={[styles.value, { color: theme.text }]}>{item.value}</Text>
              </View>
            ))}

            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            
            {/* Tombol untuk menampilkan atau menyembunyikan bio */}
            <Pressable
              onPress={() => setShowBio(!showBio)}
              style={[
                styles.button,
                { backgroundColor: theme.buttonBio }
              ]}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>
                {showBio ? "Sembunyikan Bio" : "Tampilkan Bio"}
              </Text>
            </Pressable>
              
            {/* Jika showBio true, maka bio akan tampil */}
            {showBio && (
            <>
                <Text style={[styles.bioTitle, { color: theme.text }]}>Tentang Saya :</Text>
                <Text style={[styles.bioText, { color: theme.text }]}>
                  Saya adalah mahasiswa D3 Sistem Informasi dengan ketertarikan dalam pengembangan aplikasi dan sistem berbasis teknologi.
                  Saat ini saya sedang mempelajari mobile programming dan web programming untuk memperdalam pemahaman saya tentang pengembangan aplikasi. 
                  Saya memiliki minat untuk terus mengembangkan kemampuan teknis dan membangun solusi yang bermanfaat.
                </Text>
              </>
              )}

            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            
            {/* Menampilkan daftar skill */}
            <View style={[styles.skillBox, { backgroundColor: theme.box }]}>
              <Text style={{ color: theme.text }}>Skills :</Text>
              {skills.map((skill, index) => (
                <Text key={index} style={{ color: theme.text }}>
                  {index + 1}. {skill}
                </Text>
              ))}
            </View>

            {/* Tombol untuk mengganti light mode dan dark mode */}
            <Pressable
              onPress={() => setDarkMode(!darkMode)}
              style={[
                styles.button,
                { backgroundColor: theme.buttonBio }
              ]}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>
                 {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </Text>
            </Pressable>

          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// Styling utama untuk layout dan tampilan aplikasi
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '90%',
    padding: 20,
    borderWidth: 2,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },

  row: {
  flexDirection: 'row',
  marginBottom: 5,
  },

  label: {
    width: 80,
    fontSize: 16,
  },

  colon: {
    width: 10,
    fontSize: 16,
  },

  value: {
    flex: 1,
    fontSize: 16,
  },

  bioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  bioText: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'justify',
    lineHeight: 22
  },

  skillBox: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
  
  profileImage: { 
    width: 150, 
    height: 150, 
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 15,
  },

  divider: {
  height: 1,
  width: '100%',
  marginVertical: 10,
},
});