// app/home/_layout.tsx
import StackScreenOptions from "@/src/components/StackScreenOptions";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={StackScreenOptions} />
      <Stack.Screen name="pdfviewer" options={{}} />
      <Stack.Screen
        name="searchScreen"
        options={{
          title: "Buscar",
      
          headerTitleStyle: {
            fontFamily: "PlusJakartaSans",
            fontSize: 30,
            
          },
        }}
      />
    </Stack>
  );
}
