import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type ItemBelajar = {
  id: string;
  judul: string;
  deskripsi: string;
};

type RootStackParamList = {
  Home: undefined;
  Detail: { dataItem: ItemBelajar };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  const [daftarBelajar, setDaftarBelajar] = useState<ItemBelajar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [textBaru, setTextBaru] = useState("");

  const ambilDataDariInternet = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();

      const dataFormatBaru = json.map((user: any) => ({
        id: user.id.toString(),
        judul: `Belajar ${user.company.catchPhrase}`,
        deskripsi: `Mentor: ${user.name} (${user.email})`,
        makanan: "testing",
      }));

      setDaftarBelajar(dataFormatBaru);
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil data dari internet!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    ambilDataDariInternet();
  }, []); // Array kosong [] artinya: "Jangan jalankan lagi kecuali layar dimuat ulang"

  const tambahItem = () => {
    if (textBaru.trim() === "") return;

    const itemBaru: ItemBelajar = {
      id: Date.now().toString(),
      judul: textBaru,
      deskripsi: "Target Baru Semangat Baru",
    };

    setDaftarBelajar([...daftarBelajar, itemBaru]);
    setTextBaru("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.viewportContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mau belajar apa hari ini?"
          value={textBaru}
          onChangeText={(text) => setTextBaru(text)}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={tambahItem}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2980b9" />
          <Text style={{ marginTop: 10 }}>Sedang mengambil data...</Text>
        </View>
      ) : (
        <FlatList
          data={daftarBelajar}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => navigation.navigate("Detail", { dataItem: item })}
            >
              <Text style={styles.itemText}>{item.judul}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

function DetailScreen({ route }: any) {
  const { dataItem } = route.params as { dataItem: ItemBelajar };

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailTitle}>{dataItem.judul}</Text>
      <Text style={styles.detailDesc}>{dataItem.deskripsi}</Text>

      <View style={styles.infoBox}>
        <Text>ID Tugas: {dataItem.id}</Text>
        <Text>Status: On Progress</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Daftar Misi Saya" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Detail Misi" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  viewportContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
  },
  buttonAdd: {
    width: 50,
    borderRadius: 12,
    backgroundColor: "#2980b9",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "600",
  },
  detailContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  detailDesc: {
    fontSize: 18,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 30,
  },
  infoBox: {
    padding: 20,
    backgroundColor: "#ecf0f1",
    borderRadius: 10,
    width: "100%",
  },
});
