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
  const { theme } = useTheme(); 
  const currentColors = Colors[theme]; 
  return (
    <Pressable
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        { backgroundColor: isSelected ? currentColors.pumpkin : "transparent" }, 
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          isSelected
            ? { color: currentColors.text }
            : { color: currentColors.text }, 
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
