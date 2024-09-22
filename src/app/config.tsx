import { StyleSheet } from "react-native";

import { Text, View } from "@/src/components/Themed";

export default function Home() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá Mundo</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Amem, tá funcionando</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
