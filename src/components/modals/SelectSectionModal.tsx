import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface SelectSectionModalProps {
  visible: boolean;
  sections: { title: string }[];
  onClose: () => void;
  onSectionSelect: (sectionTitle: string, itemName: string) => void;
}

const SelectSectionModal: React.FC<SelectSectionModalProps> = ({
  visible,
  sections,
  onClose,
  onSectionSelect,
}) => {
  const [itemName, setItemName] = useState("");

  const handleSectionSelect = (sectionTitle: string) => {
    if (itemName.trim()) {
      onSectionSelect(sectionTitle, itemName);
      setItemName("");
    } else {
      alert("Por favor, insira um nome para o item.");
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Escolha a Seção e Nome do Item</Text>

          {/* Campo de entrada para o nome do item */}
          <TextInput
            style={styles.input}
            placeholder="Nome do PDF"
            value={itemName}
            onChangeText={setItemName}
          />

          {/* Lista de seções */}
          <FlatList
            data={sections}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSectionSelect(item.title)}>
                <Text style={styles.sectionItem}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
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
  sectionItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cancelText: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
  },
});

export default SelectSectionModal;
