import React, { useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useTheme } from "../ThemeContext";
import Colors from "@/src/constants/Colors";

interface RenameSectionModalProps {
  visible: boolean;
  onClose: () => void;
  currentTitle: string;
  onSave: (newTitle: string) => void;
}

export const RenameSectionModal = ({
  visible,
  onClose,
  currentTitle,
  onSave,
}: RenameSectionModalProps) => {
  const [newTitle, setNewTitle] = useState(currentTitle);
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  const handleRenameSave = () => {
    if (newTitle.trim() === "") {
      Alert.alert("Erro", "O novo nome da seção não pode ser vazio.");
      return;
    }
    onSave(newTitle); 
    onClose(); 
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: currentColors.background2 },
          ]}
        >
          <Text style={[styles.modalTitle, { color: currentColors.text }]}>
            Renomear Seção
          </Text>

          <TextInput
            style={[styles.input, { color: currentColors.text }]}
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Novo Nome da Seção"
            placeholderTextColor={currentColors.text}
          />

          <View
            style={{
              flexDirection: "row",
              gap: 18,
              justifyContent: "flex-end",
              marginTop: 15,
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleRenameSave}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
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
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: 340,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 14,
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
  saveButton: {
    backgroundColor: "#10B2FF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: 80,
    elevation: 5,
  },
  cancelText: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default RenameSectionModal;
