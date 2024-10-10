import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

const PdfInfo = () => {
  const { name, uri } = useLocalSearchParams<{ name: string; uri: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nome: {name}</Text>
      {/* Aqui você pode adicionar mais informações sobre o PDF usando o uri */}
      <Text style={{color: "red"}}>URI: {uri}</Text>
      {/* Adicione qualquer outra informação que desejar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red"
  },
});

export default PdfInfo;
