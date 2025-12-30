import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const dataAwal = [
    { id: "1", judul: "Instalasi React Native" },
    { id: "2", judul: "Belajar Flexbox" },
    { id: "3", judul: "Memahami State (useState)" },
    { id: "4", judul: "Menguasai FlatList" },
    { id: "5", judul: "Navigasi Antar Layar" },
    { id: "6", judul: "Koneksi ke API" },
    { id: "7", judul: "Upload ke PlayStore" },
  ];

  const [daftarBelajar] = useState(dataAwal);

  const renderItemBelajar = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => alert("Anda memilih: " + item.judul)}
    >
      <Text style={styles.itemText}>{item.judul}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.viewportContainter}>
      <Text style={styles.headerTitle}>Roadmap Saya</Text>

      <FlatList
        data={daftarBelajar}
        renderItem={renderItemBelajar}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  viewportContainter: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    elevation: 3,
    // shadow untuk IOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // shadow untuk Android
  },
  itemText: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "600",
  },
});
