import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const portfolioData = [
  {
    id: 1,
    title: "Web Manajemen Stok",
    tech: "Html, Css, JavaScript",
    description: "Aplikasi berbasis web untuk mengelola stok barang secara digital."
  },
  {
    id: 2,
    title: "Web Peminjaman Buku",
    tech: "PHP",
    description: "Aplikasi berbasis web untuk mengelola peminjaman buku di perpustakaan."
  },
  {
    id: 3,
    title: "Fish Escape Game",
    tech: "Greenfoot",
    description: "Game edukasi dimana ikan harus menghindar dari predator."
  },
  {
    id: 4,
    title: "Web Manajemen Stok",
    tech: "Html, Css, JavaScript",
    description: "Aplikasi berbasis web untuk mengelola stok barang secara digital."
  },
  {
    id: 5,
    title: "Web Peminjaman Buku",
    tech: "PHP",
    description: "Aplikasi berbasis web untuk mengelola peminjaman buku di perpustakaan."
  },
  {
    id: 6,
    title: "Fish Escape Game",
    tech: "Greenfoot",
    description: "Game edukasi dimana ikan harus menghindar dari predator."
  },
  {
    id: 7,
    title: "Web Manajemen Stok",
    tech: "Html, Css, JavaScript",
    description: "Aplikasi berbasis web untuk mengelola stok barang secara digital."
  },
  {
    id: 8,
    title: "Web Peminjaman Buku",
    tech: "PHP",
    description: "Aplikasi berbasis web untuk mengelola peminjaman buku di perpustakaan."
  },
  {
    id: 9,
    title: "Fish Escape Game",
    tech: "Greenfoot",
    description: "Game edukasi dimana ikan harus menghindar dari predator."
  }
];

const PortfolioScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Portofolio Aryo</Text>

      <FlatList
        data={portfolioData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.tech}>
              Tech : {item.tech}
            </Text>

            <Text style={styles.desc}>
              {item.description}
            </Text>

          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  tech: {
    marginTop: 6,
    fontSize: 14,
    color: '#555'
  },

  desc: {
    marginTop: 4,
    fontSize: 14,
    color: '#666'
  }

});

export default PortfolioScreen;