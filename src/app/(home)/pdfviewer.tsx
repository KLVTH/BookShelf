import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Dimensions, View } from "react-native";
import Pdf from "react-native-pdf";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const pdfpage = () => {
  const { name, uri } = useLocalSearchParams<{ name: string; uri: string }>();
  const navigation = useNavigation(); 
  useEffect(() => {
    // Define o título do cabeçalho com o nome do PDF
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  return (
    <View style={styles.container}>
      <Pdf
        source={{
          uri,
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default pdfpage;
