import { Pressable, PressableProps, StyleSheet } from "react-native";
import { Text } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors"; // Importe suas cores
import { useTheme } from "./../components/ThemeContext"; // Importe o hook de tema

type CategoryProps = PressableProps & {
  title: string;
  isSelected?: boolean;
};

export function Category({
  title,
  isSelected = false,
  ...rest
}: CategoryProps) {
  const { theme } = useTheme(); // Obtenha o tema atual
  const currentColors = Colors[theme]; // Obtenha as cores correspondentes ao tema atual

  return (
    <Pressable
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        { backgroundColor: isSelected ? currentColors.primary : "transparent" }, // Aplica a cor do tema se selecionado
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          isSelected
            ? { color: currentColors.selectedText }
            : { color: currentColors.text }, // Aplica a cor do texto de acordo com o estado
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: "center",
    borderRadius: 9999,
    paddingHorizontal: 16,
  },
  selectedContainer: {
    // Remover essa propriedade, pois a cor é gerenciada pelo tema
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
