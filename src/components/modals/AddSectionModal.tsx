import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";
import { useTheme } from "../ThemeContext";
import Colors from "@/src/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface AddSectionModalProps {
  visible: boolean;
  onClose: () => void;
  sections: Array<{ title: string; data: any[] }>;
  onSaveData: (
    categories: string[],
    sections: Array<{ title: string; data: any[] }>,
  ) => void; // Função para salvar os dados
  setCategories: React.Dispatch<React.SetStateAction<string[]>>; // Atualiza as categorias
  setSections: React.Dispatch<
    React.SetStateAction<Array<{ title: string; data: any[] }>>
  >; // Atualiza as seções
}

export const AddSectionModal: React.FC<AddSectionModalProps> = ({
  visible,
  onClose,
  sections,
  onSaveData,
  setCategories,
  setSections,
}) => {
  const [newSectionName, setNewSectionName] = useState("");
  const { theme } = useTheme(); // Obtenha o tema atual
  const currentColors = Colors[theme]; // Obtenha as cores correspondentes ao tema atual


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
      data: [], // Itens da nova seção
    };

    // Atualizar categorias e seções
    const updatedCategories = [
      ...sections.map((section) => section.title),
      newCategory,
    ];
    const updatedSections = [...sections, newSection];

    setCategories(updatedCategories);
    setSections(updatedSections);

    // Salvar os dados
    onSaveData(updatedCategories, updatedSections);

    // Fechar o modal e limpar o campo de entrada
    onClose();
    setNewSectionName("");
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: currentColors.background2}]}>
          <View>
            <Text style={[styles.modalTitle, {color: currentColors.text}]}>Adicionar Seção?</Text>
          </View>
          <TextInput
            style={styles.input}
            value={newSectionName}
            onChangeText={setNewSectionName}
            placeholder="Nome da Seção"
            placeholderTextColor={currentColors.text}

          />
          <View style={{flexDirection: "row", gap: 10, justifyContent: "flex-end"}}>
            <Button title="Cancelar" onPress={onClose} color="red" />
            <Button title="Adicionar" onPress={confirmAddSection} color={"#332F35"}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 10,
    width: 340,
    gap: 8
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white",
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
