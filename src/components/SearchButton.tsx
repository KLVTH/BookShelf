import { forwardRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "./../components/ThemeContext"; 

export const SearchButton = forwardRef<
  typeof Pressable,
  { onPress?: () => void }
  >(({ onPress }, ref) => {
    const { theme } = useTheme(); 
    const iconColor = theme === "dark" ? "#e6e6e6" : "black"; 

    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <FontAwesome
            name="search"
            size={35}
            color={iconColor} 
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
