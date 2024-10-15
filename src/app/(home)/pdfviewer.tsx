import { router, useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import Pdf from "react-native-pdf";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/ThemeContext";
import Colors from "@/src/styles/Colors";

const PdfViewerPage = () => {
  const { name, uri } = useLocalSearchParams<{ name: string; uri: string }>();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const currentColors = Colors[theme];
  const [headerVisible, setHeaderVisible] = useState(true); 

  // Define o título e o botão de informação no header
  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerShown: headerVisible, 
      headerRight: () => (
        <Ionicons
          name="information-circle-outline"
          size={30}
          color={currentColors.icon}
          style={{ marginRight: 15 }}
          onPress={() => {
            router.push({
              pathname: "/pdfInfo",
              params: { name, uri },
            });
          }}
        />
      ),
    });
  }, [headerVisible, name, uri, navigation, currentColors.icon]);

  // Função para alternar a visibilidade do header ao tocar no centro da tela
  const toggleHeaderVisibility = () => {
    setHeaderVisible((prev) => !prev);
  };

  const { width, height } = Dimensions.get("window");
  const touchAreaSize = width * 0.45; 

  return (
    <View style={styles.container}>
      <Pdf
        source={{
          uri,
        }}
        style={styles.pdf}
      />
      <TouchableWithoutFeedback onPress={toggleHeaderVisibility}>
        <View
          style={[
            styles.touchArea,
            {
              width: touchAreaSize, 
              height: touchAreaSize, 
              marginLeft: -(touchAreaSize / 2), 
              marginTop: -(touchAreaSize / 2), 
            },
          ]}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  touchArea: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1, // garante que a área sensível ao toque esteja acima do PDF
  },
});

export default PdfViewerPage;
