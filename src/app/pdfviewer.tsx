import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import Pdf from "react-native-pdf";

const pdfpage = () => {
  const { name, uri } = useLocalSearchParams<{name: string, uri: string}>();
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{uri}</Text>
      <Pdf
        source={{
          uri
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
