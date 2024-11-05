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
  ActivityIndicator,
  Text,
} from "react-native";
import Pdf from "react-native-pdf";

const CustomHeaderTitle: React.FC<{ title: string; color: string }> = ({ title, color }) => (
  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', height: 50 }}>
    <Text style={{ fontFamily: "PlusJakartaSans", fontSize: 30, color, marginLeft: -20, marginTop: -8 }}>
      {title}
    </Text>
  </View>
);

const PdfViewerPage = () => {
  const { name, uri, pageCount, addedDate } = useLocalSearchParams() as unknown as { name: string; uri: string; pageCount: number, addedDate: string };
  const navigation = useNavigation();
  const { theme } = useTheme();
  const currentColors = Colors[theme];
  const [headerVisible, setHeaderVisible] = useState(true);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeaderTitle title={name} color={currentColors.text} />, // Usando a cor do tema
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
              params: { name, uri, pageCount, addedDate },
            });
          }}
        />
      ),
    });
  }, [headerVisible, name, uri, navigation, currentColors]);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  const handleError = (error: object) => {
    console.error("Erro ao carregar o PDF: ", error);
    setLoading(false); 
  };

  const handleLoadProgress = (percent: number) => {
    setLoadProgress(percent); 
    if (percent >= 1) {
      setLoading(false); 
    }
  };

  const toggleHeaderVisibility = () => {
    setHeaderVisible((prev) => !prev);
  };

  const touchAreaSize = dimensions.width * 0.45;

  return (
    <View style={styles.container}>
      <View style={styles.pdfContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={currentColors.icon} />
          </View>
        )}
        <Pdf
          source={{ uri }}
          style={[styles.pdf, { width: dimensions.width, height: dimensions.height, backgroundColor: currentColors.background }]}
          enablePaging={true}
          horizontal={true}
          onLoadComplete={handleLoadComplete}
          onError={handleError} 
          onLoadProgress={handleLoadProgress} 
        />
      </View>
      <TouchableWithoutFeedback onPress={toggleHeaderVisibility}>
        <View
          style={[styles.touchArea, {
            width: touchAreaSize,
            height: touchAreaSize,
            marginLeft: -(touchAreaSize / 2),
            marginTop: -(touchAreaSize / 2),
          }]}
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
    position: 'relative',
  },
  pdf: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  touchArea: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1,
  },
});

export default PdfViewerPage;
