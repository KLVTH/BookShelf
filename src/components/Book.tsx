import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";

type CustomButtonProps = {
  title: string; // Texto que será exibido no botão
  imageSource: any; // Fonte da imagem
} & TouchableOpacityProps; // Permite passar propriedades adicionais do TouchableOpacity

export function Book({
  title,
  imageSource,
  ...touchableProps
}: CustomButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...touchableProps}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // mb-4
    height: 56, // h-14
    width: "100%", // w-full
    flexDirection: "row", // flex-row
    alignItems: "center", // items-center
    borderRadius: 8, // rounded-lg
    backgroundColor: "#6B7280", // bg-gray-500
  },
  image: {
    marginLeft: 12, // ml-3
    height: 20, // h-5
    width: 20, // w-5
  },
  title: {
    marginLeft: 12, // ml-3
    marginRight: 12, // mr-3
    fontSize: 20, // text-xl
    fontWeight: "600", // font-semibold
  },
});
