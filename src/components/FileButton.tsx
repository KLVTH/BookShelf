import * as DocumentPicker from 'expo-document-picker';
import { DocumentPickerResult } from 'expo-document-picker';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

//https://sujeitoprogramador.com/wp-content/uploads/2023/04/rni-guia-aula1.pdf
export const FileButton = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  async function pickDocument() {
    let result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });
    if (result.assets && result.assets[0].uri) {
      console.log(result.assets[0].uri); //Retorna o caminho do arquivo
      setSelectedPdf(result.assets[0].uri);
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        className="h-14 w-14 absolute bottom-12 right-5 flex items-center justify-center rounded-full bg-black"
        onPress={pickDocument}>
        <Text className='color-white text-4xl'>+</Text>
      </TouchableOpacity>
    </View>
  );
};
