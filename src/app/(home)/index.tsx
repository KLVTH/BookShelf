import Colors from "@/src/constants/Colors"; // Importe suas cores
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Book } from "../../components/Book";
import { Category } from "../../components/Category";
import EditSectionModal from "../../components/EditSectionModal";
import { FileButton } from "../../components/FileButton";
import { useTheme } from "../../components/ThemeContext"; // Importe o hook de tema
import { AddSectionButton } from "@/src/components/AddSectionButton";
import { EditSectionButton } from "@/src/components/EditSectionButton";
import { BOOKS, CATEGORIES } from "../../utils/data";

const STORAGE_KEY_CATEGORIES = "@categories";
const STORAGE_KEY_SECTIONS = "@sections";

const Home = () => {
  const { theme } = useTheme(); // Obtenha o tema atual
  const currentColors = Colors[theme]; // Obtenha as cores correspondentes ao tema atual

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [categories, setCategories] = useState(CATEGORIES);
  const [sections, setSections] = useState(BOOKS);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState<string | null>(null);
  const [newSectionName, setNewSectionName] = useState("");
  const sectionListRef = useRef<SectionList>(null);

  const handleEditSection = (newTitle: string) => {
    if (sectionToEdit) {
      if (newTitle.trim() === "") {
        Alert.alert("Erro", "O nome da seção não pode ser vazio.");
        return;
      }

      // Verificar se já existe uma seção com o mesmo nome (exceto a que está sendo editada)
      const sectionExists = sections.some(
        (section) =>
          section.title.toLowerCase() === newTitle.trim().toLowerCase() &&
          section.title !== sectionToEdit, // Ignorar a seção que está sendo editada
      );

      if (sectionExists) {
        Alert.alert("Erro", "Já existe uma seção com esse nome.");
        return;
      }

      // Atualizar o nome da seção
      const updatedSections = sections.map((section) => {
        if (section.title === sectionToEdit) {
          return { ...section, title: newTitle.trim() };
        }
        return section;
      });

      // Atualizar as categorias
      const updatedCategories = updatedSections.map((section) => section.title);
      setCategories(updatedCategories); // Atualizar as categorias
      setSections(updatedSections);

      saveData(updatedCategories, updatedSections); // Salvar as seções atualizadas no AsyncStorage
      setSectionToEdit(null);
      setEditModalVisible(false); // Fechar o modal após a remoção
    }
  };

  const openEditModal = (title: string) => {
    setSectionToEdit(title);
    setEditModalVisible(true);
  };

  const removeItemFromSection = (sectionTitle: string, itemId: string) => {
    Alert.alert(
      "Remover Item",
      "Tem certeza de que deseja remover este item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const updatedSections = sections.map((section) => {
              if (section.title === sectionTitle) {
                return {
                  ...section,
                  data: section.data.filter((item) => item.id !== itemId), // Filtra o item a ser removido
                };
              }
              return section;
            });

            setSections(updatedSections);
            saveData([], updatedSections); // Atualiza os dados no AsyncStorage
          },
        },
      ],
      { cancelable: false }, // Impede que o alerta seja fechado ao clicar fora
    );
  };

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
  const openPDF = (item: { name: string; uri: string }) => {
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
        const sectionsData = JSON.parse(savedSections);
        setSections(sectionsData);
        /*console.log(
          "Dados das seções carregados:",
          JSON.stringify(sectionsData, null, 2),
        );*/ // Usando JSON.stringify para melhor visualização
      } else {
        setSections([]); // Iniciar como vazio se não houver dados
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

    // Verificar se já existe uma seção com o mesmo nome
    const sectionExists = sections.some(
      (section) =>
        section.title.toLowerCase() === newSectionName.trim().toLowerCase(),
    );

    if (sectionExists) {
      Alert.alert("Erro", "Já existe uma seção com esse nome.");
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
  const handleRemoveSection = () => {
    if (sectionToEdit) {
      Alert.alert(
        "Confirmar Remoção",
        "Tem certeza de que deseja remover esta seção?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Remover",
            onPress: () => {
              // Código de remoção da seção
              const updatedCategories = categories.filter(
                (category) => category !== sectionToEdit,
              );
              const updatedSections = sections.filter(
                (section) => section.title !== sectionToEdit,
              );

              setCategories(updatedCategories);
              setSections(updatedSections);

              // Salvar os dados atualizados no AsyncStorage
              saveData(updatedCategories, updatedSections);
              setSectionToEdit(null);
              setEditModalVisible(false); // Fechar o modal após a remoção
            },
          },
        ],
        { cancelable: false }, // Impede que o alerta seja fechado ao clicar fora
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background }]}>
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
            <AddSectionButton
              onPress={handleButtonPress}
              title="Adicionar Seção"
              buttonStyle={{ height: 45 }}
            ></AddSectionButton>
          }
        />
      </View>

      <SectionList
        style={styles.sectionList}
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item, section }) => (
          <View>
            <Book
              title={item.name}
              //imageSource={require("../../assets/images/file.png")}
              onPress={() => openPDF(item)}
              onLongPress={() => removeItemFromSection(section.title, item.id)}
            />
          </View>
        )}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.sectionListContent}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.sectionHeader, { color: currentColors.text }]}>
              {title}
            </Text>
            <EditSectionButton
              title="EDITAR"
              onPress={() => openEditModal(title)}
              buttonStyle={{ width: 80 }}
            ></EditSectionButton>
          </View>
        )}
        ListFooterComponent={
          <View
            style={{ display: "flex", alignItems: "center", paddingTop: 15 }}
          >
            <AddSectionButton
              onPress={handleButtonPress}
              title="Adicionar Seção"
            ></AddSectionButton>
          </View>
        }
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              margin: 20,
              fontSize: 18,
              color: "gray",
              opacity: 0.4,
            }}
          >
            Nenhuma Seção Encontrada
          </Text>
        }
      />

      {/* Modal para edição da seção */}
      <EditSectionModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        currentTitle={sectionToEdit || ""}
        onSave={handleEditSection}
        onDelete={handleRemoveSection} // Passando a função de remover
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
    width: "100%",
  },
  categoryListContainer: {
    paddingTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#F97316", // cor laranja
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
    paddingHorizontal: 12,
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
