import { Text } from "react-native";
import Colors from "@/src/styles/Colors";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/ThemeContext";

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
        {
          borderBottomColor: isSelected
            ? currentColors.selectedCategory
            : "transparent",
        },
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          isSelected
            ? { color: currentColors.selectedCategory }
            : { color: currentColors.placeholder },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  selectedContainer: {
    borderBottomWidth: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "semibold",
  },
});
