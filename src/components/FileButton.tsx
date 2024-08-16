import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Button } from '../components/Button';
import * as DocumentPicker from 'expo-document-picker';
import { DocumentPickerResult } from 'expo-document-picker';

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
        style={{
          position: 'absolute',
          right: 20,
          bottom: 50,
          backgroundColor: '#000',
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={pickDocument}>
        <Text style={{ color: '#fff', fontSize: 35 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
