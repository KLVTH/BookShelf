import Colors from "@/src/styles/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks/ThemeContext";
import { RenameSectionModal } from "./RenameSectionModal";

interface EditSectionModalProps {
  visible: boolean;
  onClose: () => void;
  currentTitle: string;
  onSave: (newTitle: string) => void;
  onDelete: () => void;
}

export const EditSectionModal = ({
  visible,
  onClose,
  currentTitle,
  onSave,
  onDelete,
}: EditSectionModalProps) => {
  const [isRenameModalVisible, setRenameModalVisible] = useState(false);
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  const openRenameModal = () => {
    setRenameModalVisible(true);
  };

  const handleRenameSave = (newTitle: string) => {
    onSave(newTitle);
    setRenameModalVisible(false);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={[styles.modalContainer, { backgroundColor: "rgba(0,0,0,0.7)" }]}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: currentColors.background },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.modalTitle, { color: currentColors.text }]}>
              Editar Seção
            </Text>

            <View>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={26} color={"red"} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 18,
              justifyContent: "flex-start",
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              style={styles.renameButton}
              onPress={openRenameModal}
            >
              <Text style={styles.buttonText}>Renomear</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.buttonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal de renomear seção */}
      <RenameSectionModal
        visible={isRenameModalVisible}
        onClose={() => setRenameModalVisible(false)}
        currentTitle={currentTitle}
        onSave={handleRenameSave}
      />
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
  renameButton: {
    backgroundColor: "#10B2FF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: "#D9163F",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default EditSectionModal;
