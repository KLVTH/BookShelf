import * as DocumentPicker from "expo-document-picker";
import { DocumentPickerResult } from "expo-document-picker";
import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
} from "react-native";

export const FileButton = ({
  onAddItem,
  sections,
}: {
  onAddItem: (sectionTitle: string, itemName: string, uri: string) => void;
  sections: { title: string }[];
}) => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState<string>(""); // Estado para o nome do item

  async function pickDocument() {
    let result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (result.assets && result.assets[0].uri) {
      const pdfUri = result.assets[0].uri;
      setSelectedPdf(pdfUri);
      setModalVisible(true); // Exibir o modal ao selecionar um PDF
    }
  }

  const handleSectionSelect = (sectionTitle: string) => {
    if (selectedPdf && itemName.trim()) {
      onAddItem(sectionTitle, itemName, selectedPdf); // Passar o nome do item
      setModalVisible(false); // Fechar o modal após adicionar o item
      setSelectedPdf(null); // Limpar o PDF selecionado
      setItemName(""); // Limpar o nome do item
    } else {
      alert("Por favor, insira um nome para o item.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      {/* Modal para escolher a seção e nome do item */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Escolha a Seção e Nome do Item
            </Text>

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
                <TouchableOpacity
                  onPress={() => handleSectionSelect(item.title)}
                >
                  <Text style={styles.sectionItem}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    width: 56,
    position: "absolute",
    bottom: 48,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: "orange",
  },
  buttonText: {
    color: "white",
    fontSize: 32,
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
