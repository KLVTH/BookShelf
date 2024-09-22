import {  Pressable, PressableProps, StyleSheet } from "react-native";
import { Text } from "@/src/components/Themed";

type CategoryProps = PressableProps & {
  title: string;
  isSelected?: boolean;
};

export function Category({
  title,
  isSelected = false,
  ...rest
}: CategoryProps) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.selectedContainer]}
      {...rest}
    >
      <Text
        style={[styles.text, isSelected && styles.selectedText]}
        
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40, // h-10
    justifyContent: "center", // justify-center
    borderRadius: 9999, // rounded-full (border-radius máximo)
    paddingHorizontal: 16, // px-4
    backgroundColor: "transparent", // Para corresponder à ausência de fundo no caso não selecionado
  },
  selectedContainer: {
    backgroundColor: "black", // bg-black
  },
  text: {
    fontSize: 18, // text-lg
    fontWeight: "bold", // font-bold
  },
  selectedText: {
    color: "#F24E1E", // text-[#F24E1E]
  },
});
