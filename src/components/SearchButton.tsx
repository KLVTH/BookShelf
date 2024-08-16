import { forwardRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet } from "react-native";

export const SearchButton = forwardRef<
  typeof Pressable,
  { onPress?: () => void }
>(({ onPress }, ref) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <FontAwesome
          name="search"
          size={35}
          color="black"
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
