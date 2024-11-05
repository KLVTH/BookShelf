import { useTheme } from "@/src/hooks/ThemeContext";
import Colors from "@/src/styles/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PdfInfo = () => {
  const { name, uri, pageCount, addedDate } = useLocalSearchParams() as unknown as { name: string; uri: string; pageCount: number, addedDate: string };
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  const handleHeadphonesPress = () => {
    Alert.alert("Atenção!", "Funcionalidade em desenvolvimento", [{ text: "OK" }]);
  };

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background }]}>
      <View style={styles.header}>
        <Ionicons
          name="document"
          size={140}
          color={currentColors.icon}
          style={styles.coverImage}
        />
        <Text style={[styles.title, { color: currentColors.text }]}>{name}</Text>
        <Text style={[styles.author, { color: currentColors.text }]}>Autor não encontrado...</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: currentColors.text }]}>Páginas</Text>
          <Text style={[styles.infoValue, { color: currentColors.text }]}>{pageCount}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: currentColors.text }]}>Data da adição</Text>
          <Text style={[styles.infoValue, { color: currentColors.text }]}>{addedDate}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: currentColors.text }]}>Caminho do arquivo:</Text>
        <Text style={[styles.sectionText, { color: currentColors.text }]}>
          {uri}
        </Text>
      </View>

      <Pressable style={[styles.actionButton, { backgroundColor: currentColors.selectedCategory }]} onPress={handleHeadphonesPress}>
        <Ionicons name="headset" size={24} color={currentColors.background} style={styles.actionIcon} />
        <Text style={[styles.actionButtonText, { color: currentColors.background }]}>Ouvir PDF</Text>
      </Pressable>

      <TouchableOpacity 
        style={{ backgroundColor: currentColors.drawerActive, padding: 10, borderRadius: 5 }} 
         onPress={() => {
             router.back();
        }}>
    <Text style={{ color: currentColors.text, fontSize: 16, textAlign: 'center' }}>
    Ler PDF
    </Text>
  </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  coverImage: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  infoRow: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "justify",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  actionIcon: {
    marginRight: 5,
  },
  actionButtonText: {
    fontSize: 16,
  },
});

export default PdfInfo;
