import Colors from "@/src/styles/Colors";
import { Ionicons } from "@expo/vector-icons"; // Importando Ionicons
import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "../../hooks/ThemeContext";

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

  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [sectionItems, setSectionItems] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    setSectionItems(
      sections.map((section) => ({
        label: section.title,
        value: section.title,
      })),
    );
  }, [sections]);

  const handleSectionSelect = () => {
    if (itemName.trim() && selectedSection) {
      onSectionSelect(selectedSection, itemName);
      setItemName("");
      setSelectedSection(null);
    } else {
      alert("Por favor, insira um nome para o item e selecione uma seção.");
    }
  };

  const handleClose = () => {
    setItemName("");
    setSelectedSection(null);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: currentColors.background },
          ]}
        >
          <Text
            style={[
              styles.modalTitle,
              { color: currentColors.text, marginBottom: 10 },
            ]}
          >
            Digite o nome do Item:
          </Text>
          <TextInput
            style={[styles.input, { color: currentColors.text }]}
            placeholder="Nome do arquivo"
            value={itemName}
            onChangeText={setItemName}
            placeholderTextColor={currentColors.placeholder}
          />

          <Text style={[styles.modalTitle, { color: currentColors.text }]}>
            Selecione a seção:
          </Text>
          <DropDownPicker
            open={open}
            value={selectedSection}
            items={sectionItems}
            setOpen={setOpen}
            setValue={setSelectedSection}
            setItems={setSectionItems}
            placeholder="Selecione uma seção"
            language="PT"
            showTickIcon={true}
            containerStyle={{ marginBottom: 20, marginTop: 10 }}
            style={{
              backgroundColor: currentColors.background,
              borderColor: "gray",
            }}
            dropDownContainerStyle={{
              backgroundColor: currentColors.background,
              borderColor: "gray",
            }}
            labelStyle={{ color: currentColors.text }}
            textStyle={{ color: currentColors.text }}
            arrowIconStyle={{
              width: 20,
              height: 20,
            }}
            ArrowUpIconComponent={({ style }) => (
              <Ionicons
                name="chevron-up"
                style={style}
                size={20}
                color={currentColors.icon}
              />
            )}
            ArrowDownIconComponent={({ style }) => (
              <Ionicons
                name="chevron-down"
                style={style}
                size={20}
                color={currentColors.icon}
              />
            )}
            TickIconComponent={({ style }) => (
              <Ionicons
                name="checkmark"
                style={style}
                size={20}
                color={currentColors.text}
              />
            )}
          />

          <View
            style={{
              flexDirection: "row",
              gap: 18,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSectionSelect}
              style={styles.button}
            >
              <Text style={styles.confirmText}>Confirmar</Text>
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
    marginBottom: 15,
    paddingHorizontal: 8,
    borderRadius: 5,
    color: "white",
  },
  confirmText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#10B2FF",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
});

export default SelectSectionModal;
