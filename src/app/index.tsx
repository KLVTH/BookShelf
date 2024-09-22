import { Text, View } from "@/src/components/Themed";
import React, { useRef, useState, useEffect } from "react";
import {
  Alert,
  Button,
  FlatList,
  SectionList,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book } from "../components/Book";
import { Category } from "../components/Category";
import { FileButton } from "../components/FileButton";
import { BOOKS, CATEGORIES } from "../utils/data";
import { router } from "expo-router";

const STORAGE_KEY_CATEGORIES = "@categories";
const STORAGE_KEY_SECTIONS = "@sections";

const Home = () => {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [categories, setCategories] = useState(CATEGORIES);
  const [sections, setSections] = useState(BOOKS);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const sectionListRef = useRef<SectionList>(null);

  
  const addItemToSection = (
    sectionTitle: string,
    newItem: { id: string; name: string; uri: string },
  ) => {
    const updatedSections = sections.map((section) => {
      if (section.title === sectionTitle) {
        return {
          ...section,
          data: [...section.data, newItem],
        };
      }
      return section;
    });

    setSections(updatedSections);
    saveData([], updatedSections);
  };
  //função que abre o pdf
  const openPDF = (item: {name: string, uri: string }) => {
    router.push({
      pathname: "/pdfviewer",
      params: { name: item.name, uri: item.uri },
    });
  };

  // Função para carregar dados salvos no AsyncStorage
  const loadData = async () => {
    try {
      const savedCategories = await AsyncStorage.getItem(
        STORAGE_KEY_CATEGORIES,
      );
      const savedSections = await AsyncStorage.getItem(STORAGE_KEY_SECTIONS);

      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
      if (savedSections) {
        setSections(JSON.parse(savedSections));
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  // Função para salvar categorias e seções no AsyncStorage
  const saveData = async (newCategories: string[], newSections: any[]) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY_CATEGORIES,
        JSON.stringify(newCategories),
      );
      await AsyncStorage.setItem(
        STORAGE_KEY_SECTIONS,
        JSON.stringify(newSections),
      );
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  // Carregar categorias e seções quando o aplicativo iniciar
  useEffect(() => {
    loadData();
  }, []);

  // Função da lista horizontal de categorias
  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = categories.findIndex(
      (category) => category === selectedCategory,
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  // Função para adicionar uma nova seção com popup
  function handleButtonPress() {
    setModalVisible(true);
  }

  // Função para confirmar a adição da nova seção
  const confirmAddSection = () => {
    if (newSectionName.trim() === "") {
      Alert.alert("Erro", "O nome da seção não pode ser vazio.");
      return;
    }

    const newCategory = newSectionName.trim();
    const newSection = {
      title: newCategory,
      data: [], // Defina os itens que serão adicionados à nova seção
    };

    // Atualizar categorias e seções
    const updatedCategories = [...categories, newCategory];
    const updatedSections = [...sections, newSection];

    setCategories(updatedCategories);
    setSections(updatedSections);

    // Salvar os dados no AsyncStorage
    saveData(updatedCategories, updatedSections);

    // Fechar o modal e limpar o campo de entrada
    setModalVisible(false);
    setNewSectionName("");
  };

  // Função para remover uma seção
  const handleRemoveSection = (sectionTitle: string) => {
    // Exibir alerta de confirmação
    Alert.alert(
      "Remover Seção",
      `Tem certeza de que deseja remover a seção "${sectionTitle}"?`,
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const updatedCategories = categories.filter(
              (category) => category !== sectionTitle,
            );
            const updatedSections = sections.filter(
              (section) => section.title !== sectionTitle,
            );

            setCategories(updatedCategories);
            setSections(updatedSections);

            // Salvar os dados atualizados no AsyncStorage
            saveData(updatedCategories, updatedSections);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryListContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Category
              title={item}
              onPress={() => handleCategorySelect(item)}
              isSelected={item === category}
            />
          )}
          style={styles.categoryList}
          contentContainerStyle={styles.categoryListContent}
          showsHorizontalScrollIndicator={true}
          horizontal
          ListFooterComponent={
            <Button title="Adicionar Seção" onPress={handleButtonPress} />
          }
        />
      </View>

      <SectionList
        style={styles.sectionList}
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <View>
            <Book
              title={item.name}
              imageSource={require("./../assets/images/icon.png")}
              onPress={() => openPDF(item)}
              onLongPress={() => {
                console.log("Button long Pressed!");
              }}
            />
          </View>
        )}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.sectionListContent}
        renderSectionHeader={({ section: { title } }) => (
          <TouchableOpacity onLongPress={() => handleRemoveSection(title)}>
            <Text style={styles.sectionHeader}>{title}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <Button title="Adicionar Seção" onPress={handleButtonPress} />
        }
      />

      {/* Modal para entrada do nome da nova seção */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Digite o nome da nova seção</Text>
            <TextInput
              style={styles.input}
              value={newSectionName}
              onChangeText={setNewSectionName}
              placeholder="Nome da Seção"
            />
            <Button title="Adicionar" onPress={confirmAddSection} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      <FileButton
        sections={sections} // Passa as seções disponíveis
        onAddItem={(sectionTitle, itemName, pdfUri) => {
          const newItem = {
            id: String(new Date().getTime()), // Gera um ID único
            name: itemName, // Nome escolhido pelo usuário
            uri: pdfUri, // URI do PDF selecionado
          };
          addItemToSection(sectionTitle, newItem); // Adiciona o item na seção selecionada
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryListContainer: {
    paddingTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#F24E1E", // cor laranja
  },
  categoryList: {
    height: 56,
  },
  categoryListContent: {
    gap: 12,
    paddingHorizontal: 32,
  },
  sectionList: {
    width: "100%",
  },
  sectionListContent: {
    paddingBottom: 100,
    paddingHorizontal: 32,
  },
  sectionHeader: {
    marginBottom: 16,
    marginTop: 32,
    fontSize: 22,
    fontWeight: "800",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default Home;
