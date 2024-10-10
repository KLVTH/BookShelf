import { Book } from "@/src/components/buttons/Book";
import { useTheme } from "@/src/hooks/ThemeContext";
import Colors from "@/src/styles/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Section } from "./../../utils/data"; 

const STORAGE_KEY_SECTIONS = "@sections"; 

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([]);

  const { theme } = useTheme(); 
  const currentColors = Colors[theme]; 

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedSections = await AsyncStorage.getItem(STORAGE_KEY_SECTIONS);
        if (savedSections) {
          setSections(JSON.parse(savedSections));
        } else {
          setSections([]);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData();
  }, []); 

  
  const filterBooks = () => {
    
    if (!searchTerm) {
      return sections.flatMap((section) => section.data);
    }

    return sections.flatMap((section) =>
      section.data.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  };

  // Função para renderizar os livros
  const openPDF = (item: { name: string; uri: string }) => {
    router.push({
      pathname: "/pdfviewer",
      params: { name: item.name, uri: item.uri },
    });
  };

  const filteredBooks = filterBooks(); // Filtra os livros

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { color: currentColors.text }]}
        placeholder="Procure por um livro"
        placeholderTextColor={currentColors.text}
        value={searchTerm}
        onChangeText={setSearchTerm} 
      />

      {filteredBooks.length === 0 ? ( // Verifica se há livros filtrados
        <Text style={styles.noResults}>Nenhum Resultado Encontrado.</Text>
      ) : (
        <FlatList
          data={filteredBooks} 
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Book
                title={item.name}
                //imageSource={require("../../assets/images/icon.png")}
                onPress={() => openPDF(item)}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  bookItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
});

export default SearchScreen;
