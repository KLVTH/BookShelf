import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { DocumentPickerResult } from "expo-document-picker";
import SelectSectionModal from "./modals/SelectSectionModal"; 

export const FileButton = ({
  onAddItem,
  sections,
}: {
  onAddItem: (sectionTitle: string, itemName: string, uri: string) => void;
  sections: { title: string }[];
}) => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  async function pickDocument() {
    let result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (result.assets && result.assets[0].uri) {
      const pdfUri = result.assets[0].uri;
      setSelectedPdf(pdfUri);
      setModalVisible(true); 
    }
  }

  const handleSectionSelect = (sectionTitle: string, itemName: string) => {
    if (selectedPdf) {
      onAddItem(sectionTitle, itemName, selectedPdf);
      setModalVisible(false); 
      setSelectedPdf(null); 
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      {/* Modal de seleção de seção e nome do item */}
      <SelectSectionModal
        visible={modalVisible}
        sections={sections}
        onClose={() => setModalVisible(false)}
        onSectionSelect={handleSectionSelect}
      />
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
});
