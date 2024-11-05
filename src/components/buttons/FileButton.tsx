import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { DocumentPickerResult } from "expo-document-picker";
import { PDFDocument } from "pdf-lib"; // Importa PDFDocument
import SelectSectionModal from "@/src/components/modals/SelectSectionModal";

export const FileButton = ({
  onAddItem,
  sections,
}: {
  onAddItem: (
    sectionTitle: string,
    itemName: string,
    uri: string,
    pageCount: number,
    addedDate: string 
  ) => void; 
  sections: { title: string }[];
}) => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pageCount, setPageCount] = useState<number | null>(null); 

  async function pickDocument() {
    let result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (result.assets && result.assets[0].uri) {
      const pdfUri = result.assets[0].uri;
      setSelectedPdf(pdfUri);

      // Obtém o número de páginas do PDF
      const pdfBytes = await fetch(pdfUri).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const numberOfPages = pdfDoc.getPageCount(); 
      setPageCount(numberOfPages); 

      setModalVisible(true);
    }
  }

  const handleSectionSelect = (sectionTitle: string, itemName: string) => {
    if (selectedPdf && pageCount !== null) {
      const addedDate = new Date().toLocaleDateString(); 
      console.log(`PDF adicionado em: ${addedDate}`); 
      onAddItem(sectionTitle, itemName, selectedPdf, pageCount, addedDate);
      setModalVisible(false);
      setSelectedPdf(null);
      setPageCount(null); 
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

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
    backgroundColor: "#10B2FF",
  },
  buttonText: {
    color: "white",
    fontSize: 32,
  },
});
