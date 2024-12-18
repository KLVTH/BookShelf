import { AddSectionButton } from "@/src/components/buttons/AddSectionButton";
import { EditSectionButton } from "@/src/components/buttons/EditSectionButton";
import { FileButton } from "@/src/components/buttons/FileButton";
import { AddSectionModal } from "@/src/components/modals/AddSectionModal";
import { EditSectionModal } from "@/src/components/modals/EditSectionModal";
import Colors from "@/src/styles/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Book } from "../../components/buttons/Book";
import { Category } from "../../components/buttons/Category";
import { useTheme } from "../../hooks/ThemeContext";
import { BOOKS, CATEGORIES } from "../../utils/data";
import { useCategoryListVisibility } from "./../../hooks/CategoryListVisibility";

const STORAGE_KEY_CATEGORIES = "@categories";
const STORAGE_KEY_SECTIONS = "@sections";

const Home = () => {
  const { theme } = useTheme();
  const currentColors = Colors[theme];
  const { isListVisible } = useCategoryListVisibility();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [categories, setCategories] = useState(CATEGORIES);
  const [sections, setSections] = useState(BOOKS);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState<string | null>(null);
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
    newItem: { id: string; name: string; uri: string, pageCount: number, addedDate: string },
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
  const openPDF = (item: { name: string; uri: string; pageCount: number, addedDate: string }) => {
    router.push({
      pathname: "/pdfviewer",
      params: { name: item.name, uri: item.uri, pageCount: item.pageCount, addedDate: item.addedDate },
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
    <View
      style={[styles.container, { backgroundColor: currentColors.background }]}
    >
      {/* Renderizar FlatList condicionalmente com base em isListVisible */}
      {isListVisible && (
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
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryListContent}
            horizontal
            ListEmptyComponent={
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "gray",
                  opacity: 0.4,
                  justifyContent: "center",
                  flex: 1,
                  padding: 10
                }}
              >
                Adicione uma seção
              </Text>
            }
          />
        </View>
      )}

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
              pageCount={item.pageCount}
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
              marginTop: 18,
              marginBottom: 16,
            }}
          >
            <Text style={[styles.sectionHeader, { color: currentColors.text }]}
            numberOfLines={1} // Limita a uma linha
            ellipsizeMode="tail" // Adiciona "..." se o texto for muito longo
            >
              {title}
            </Text>
            <EditSectionButton
              onPress={() => openEditModal(title)}
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
        onDelete={handleRemoveSection}
      />

      {/* Modal para entrada do nome da nova seção */}
      <AddSectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        sections={sections}
        setCategories={setCategories}
        setSections={setSections}
        onSaveData={saveData} // Função que salva as categorias e seções no AsyncStorage
      />

      <FileButton
        sections={sections} // Passa as seções disponíveis
        onAddItem={(sectionTitle, itemName, pdfUri, pageCount, addedDate) => {
          // Adicione pageCount aqui
          const newItem = {
            id: String(new Date().getTime()), // Gera um ID único
            name: itemName, // Nome escolhido pelo usuário
            uri: pdfUri, // URI do PDF selecionado
            pageCount: pageCount, // Inclua o número de páginas
            addedDate: addedDate,
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
    borderBottomWidth: 0.5,
    borderBottomColor: "108, 117, 125, 0.5",
    height: 50
  },

  categoryListContent: {
    gap: 12,
    paddingHorizontal: 18,
  },
  sectionList: {
    width: "100%",
  },
  sectionListContent: {
    paddingBottom: 100,
    paddingHorizontal: 12,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
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
