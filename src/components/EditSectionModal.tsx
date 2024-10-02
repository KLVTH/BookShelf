import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

interface EditSectionModalProps {
  visible: boolean;
  onClose: () => void;
  currentTitle: string;
  onSave: (newTitle: string) => void;
  onDelete: () => void;
}

const EditSectionModal = ({
  visible,
  onClose,
  currentTitle,
  onSave,
  onDelete,
}: EditSectionModalProps) => {
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [isRenameModalVisible, setRenameModalVisible] = useState(false);

  const openRenameModal = () => {
    setNewTitle(currentTitle); // Inicializa com o título atual
    setRenameModalVisible(true); // Abre o modal de renomear
  };

  const handleRenameSave = () => {
    if (newTitle.trim() === "") {
      Alert.alert("Erro", "O novo nome da seção não pode ser vazio.");
      return;
    }
    onSave(newTitle); // Chama a função para renomear
    setRenameModalVisible(false); // Fecha o modal de renomear
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Seção</Text>

          <TouchableOpacity
            style={styles.renameButton}
            onPress={openRenameModal}
          >
            <Text style={styles.buttonText}>Renomear Seção</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.buttonText}>Remover Seção</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para renomear a seção */}
      <Modal
        visible={isRenameModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Renomear Seção</Text>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Novo Nome da Seção"
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleRenameSave}
            >
              <Text style={styles.buttonText}>Salvar Novo Nome</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setRenameModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  renameButton: {
    backgroundColor: "orange",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default EditSectionModal;
