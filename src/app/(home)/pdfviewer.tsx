import { useTheme } from "@/src/hooks/ThemeContext";
import Colors from "@/src/styles/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Pdf from "react-native-pdf";

const PdfViewerPage = () => {
  const { name, uri } = useLocalSearchParams<{ name: string; uri: string }>();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const currentColors = Colors[theme];
  const [headerVisible, setHeaderVisible] = useState(true);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

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

  const toggleHeaderVisibility = () => {
    setHeaderVisible((prev) => !prev);
  };

  const touchAreaSize = dimensions.width * 0.45;

  return (
    <View style={styles.container}>
      <View style={styles.pdfContainer}>
        <Pdf
          source={{ uri }}
          style={[
            styles.pdf,
            {
              width: dimensions.width,
              height: dimensions.height,
              backgroundColor: currentColors.background,
            },
          ]}
          enablePaging={true} // Permite a rolagem de páginas
          horizontal={true}
        />
      </View>
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
  pdfContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
  touchArea: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1,
  },
});

export default PdfViewerPage;
