import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { Section, BookItem } from "./../../utils/data"; // Ajuste o caminho
import { Book } from "@/src/components/Book";
import { router } from "expo-router";
import { useTheme } from "@/src/components/ThemeContext";
import Colors from "@/src/constants/Colors";

const STORAGE_KEY_SECTIONS = "@sections"; // Defina a chave do AsyncStorage

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([]); // Estado para armazenar as seções carregadas

  const { theme } = useTheme(); // Obtenha o tema atual
  const currentColors = Colors[theme]; // Obtenha as cores correspondentes ao tema atual

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedSections = await AsyncStorage.getItem(STORAGE_KEY_SECTIONS);
        if (savedSections) {
          setSections(JSON.parse(savedSections));
        } else {
          setSections([]); // Inicializa como vazio se não houver dados
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData();
  }, []); // Carrega os dados apenas uma vez ao montar o componente

  // Função para filtrar os livros com base no termo de busca
  const filterBooks = () => {
    // Se não houver termo de busca, retorna todos os livros
    if (!searchTerm) {
      return sections.flatMap((section) => section.data); // Retorna todos os livros de todas as seções
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
        onChangeText={setSearchTerm} // Permite que o TextInput altere o estado
      />

      {filteredBooks.length === 0 ? ( // Verifica se há livros filtrados
        <Text style={styles.noResults}>Nenhum Resultado Encontrado.</Text>
      ) : (
        <FlatList
          data={filteredBooks} // Usa os livros filtrados aqui
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
