import { forwardRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet } from "react-native";
import { useColorScheme } from "react-native"; // Importando useColorScheme

export const SearchButton = forwardRef<
  typeof Pressable,
  { onPress?: () => void }
>(({ onPress }, ref) => {
  const colorScheme = useColorScheme(); // Obtendo o tema atual

  const iconColor = colorScheme === "dark" ? "white" : "black"; // Define a cor do ícone com base no tema

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <FontAwesome
          name="search"
          size={35}
          color={iconColor} // Aplica a cor do ícone baseada no tema
          style={[
            styles.headerRight,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        />
      )}
    </Pressable>
  );
});

export const styles = StyleSheet.create({
  headerRight: {
    marginRight: 20,
  },
});
