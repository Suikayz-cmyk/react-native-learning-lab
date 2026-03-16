import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';

const { width } = Dimensions.get('window');

const userData = {
  name: 'Muhammad Prayogo Pangestu',
  username: 'Aryo',
  bio: 'Mahasiswa D3 Sistem Informasi UPNVJ',
  avatar: require('../../assets/avatar.jpg'),
};

const aboutMe = `Saya mahasiswa D3 Sistem Informasi UPNVJ 
yang tertarik pada backend development,
database system, dan mobile development.
Kut'rima suratmu
T'lah kubaca dan aku mengerti
Betapa merindunya
Dirimu akan hadirnya diriku
Di dalam hari-harimu
Bersama lagi
Kautanyakan padaku
Kapan aku akan kembali lagi
Katamu kau tak kuasa
Melawan gejolak di dalam dada
Yang membara, menahan rasa
Pertemuan kita nanti
Saat bersama dirimu
Semua kata rindumu semakin membuatku tak berdaya
Menahan rasa ingin jumpa
Percayalah padaku, aku pun rindu kamu, ku akan pulang
Melepas semua kerinduan yang terpendam`;

const skills = ["Html", "MySQL", "React Native", "C"];

const contacts = [
  { name: "GitHub", url: "https://github.com/Suikayz-cmyk" },
  { name: "Email", url: "mailto:2410501046@mahasiswa.upnvj.ac.id" }
];

const lightTheme = {
  background: '#f5f9ff',
  card: '#ffffff',
  text: '#1a1a1a',
  subText: '#666',
  primary: '#2196F3',
};

const darkTheme = {
  background: '#0f172a',
  card: '#1e293b',
  text: '#ffffff',
  subText: '#94a3b8',
  primary: '#3b82f6',
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>

      {/* Dark Mode Button */}
      <TouchableOpacity
        onPress={() => setDarkMode(!darkMode)}
        style={{
          position: 'absolute',
          top: 60,
          right: 20,
          zIndex: 20,
        }}
      >
        <Ionicons
          name={darkMode ? 'sunny' : 'moon'}
          size={26}
          color={theme.text}
        />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Image */}
       <LinearGradient
        colors={['#2196F3', '#1e40af']}
        style={styles.coverImage}
        />

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={userData.avatar}
            style={styles.avatar}
          />
        </View>

        {/* Info Section */}
        <View
          style={[
            styles.infoSection,
            { backgroundColor: theme.card }
          ]}
        >
          <Text style={[styles.name, { color: theme.text }]}>
            {userData.name}
          </Text>

          <Text style={[styles.username, { color: theme.subText }]}>
            {userData.username}
          </Text>

          <Text style={[styles.bio, { color: theme.subText }]}>
            {userData.bio}
          </Text>
                 
          {/* Portfolio Button */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.btnPrimary,
                { backgroundColor: theme.primary }
              ]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Portfolio')}
            >
              <Ionicons
                name="briefcase"
                size={18}
                color="#fff"
              />
              <Text style={styles.btnPrimaryText}>
                {' '}Portofolio
              </Text>
            </TouchableOpacity>
          </View>

            {/* About me */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.sectionText}>{aboutMe}</Text>
          </View>

            {/* Skills */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>

            <View style={styles.skillContainer}>
                {skills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                    <Text style={styles.skillText}>{skill}</Text>
                </View>
                ))}
            </View>
            </View>

            {/* Contacts */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>

            <View style={styles.contactRow}>
                {contacts.map((contact, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.contactBtn}
                    onPress={() => Linking.openURL(contact.url)}
                >
                    <Text style={styles.contactText}>{contact.name}</Text>
                </TouchableOpacity>
                ))}
            </View>
            </View>

        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 180,
    justifyContent: 'flex-end'
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  infoSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
  },
  username: {
    fontSize: 14,
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
 
  actionRow: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  btnPrimary: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  section: {
  marginTop: 24,
  width: '100%',
},

sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
},

sectionText: {
  fontSize: 14,
  color: '#666',
  lineHeight: 20,
},

skillContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
},

skillTag: {
  backgroundColor: '#e3f2fd',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 8,
},

skillText: {
  fontSize: 13,
},

contactRow: {
  flexDirection: 'row',
  gap: 10,
},

contactBtn: {
  backgroundColor: '#2196F3',
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 8,
},

contactText: {
  color: '#fff',
  fontWeight: '600'
}
});

export default ProfileScreen;