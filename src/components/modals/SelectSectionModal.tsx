import Colors from "@/src/constants/Colors";
import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useTheme } from "../ThemeContext";

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
  const { theme } = useTheme();
  const currentColors = Colors[theme];
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleSectionSelect = (sectionTitle: string) => {
    if (itemName.trim()) {
      onSectionSelect(sectionTitle, itemName);
      setItemName("");
    } else {
      alert("Por favor, insira um nome para o item.");
    }
  };

  const scrollViewHeight = 200; // Altura máxima do ScrollView
  const listHeight = sections.length > 0 ? sections.length * 50 : 0; // Altura total da lista
  const scrollIndicatorHeight = listHeight > 0 ? scrollViewHeight * (scrollViewHeight / listHeight) : 0;

  const handleClose = () => {
    setItemName(""); // Limpa o texto no input
    onClose(); // Chama a função original para fechar o modal
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: currentColors.background2 }]}>
          <Text style={[styles.modalTitle, { color: currentColors.text, marginBottom: 10 }]}>Digite o nome do Item:</Text>
          <TextInput
            style={[styles.input, { color: currentColors.text }]}
            placeholder="Nome do arquivo"
            value={itemName}
            onChangeText={setItemName}
            placeholderTextColor={currentColors.text}
          />
          <Text style={[styles.modalTitle, { color: currentColors.text }]}>Selecione a seção:</Text>
          <View style={{ maxHeight: scrollViewHeight }}>
            <Animated.FlatList
              data={sections}
              keyExtractor={(item) => item.title}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSectionSelect(item.title)}>
                  <Text style={[styles.sectionItem, { color: currentColors.text }]}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            {/* Overlay para o indicador de rolagem */}
            {listHeight > 0 && (
              <View style={styles.scrollIndicator}>
                <Animated.View
                  style={[
                    styles.indicator,
                    { backgroundColor: currentColors.text },
                    {
                      height: scrollIndicatorHeight,
                      transform: [{
                        translateY: scrollY.interpolate({
                          inputRange: [0, listHeight - scrollViewHeight],
                          outputRange: [0, scrollViewHeight - scrollIndicatorHeight],
                          extrapolate: 'clamp',
                        }),
                      }],
                    },
                  ]}
                />
              </View>
            )}
          </View>
          <TouchableOpacity onPress={handleClose}>
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
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: 340,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    color: "white",
  },
  sectionItem: {
    padding: 10,
    fontSize: 16,
    width: 280,
  },
  cancelText: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: 280,
  },
  scrollIndicator: {
    position: 'absolute',
    right: 5,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: 'transparent',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'white',
    width: 3,
  },
});

export default SelectSectionModal;
