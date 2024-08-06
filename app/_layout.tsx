import '../global.css'
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomerDrawerContent from "~/components/CustomDrawerContent";
import { HeaderButton } from '~/components/HeaderButton';
import { useFonts, PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans';

const DrawerLayout = () => {
  
  //! Essa não é a melhor maneira de implementar as fontes, Revise o código
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomerDrawerContent}
        //Componentizar o screenOptions assim como fez com o drawerContent
        screenOptions={({ navigation }) => ({
          drawerActiveBackgroundColor: '#F24E1E',
          drawerActiveTintColor: '#fff',
          drawerLabelStyle: { marginLeft: -20 },
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans_700Bold', 
            fontSize: 30,
            marginLeft: -5
          },
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={40} 
              color="black" 
              style={{ marginLeft: 15, marginVertical: 12 }}
              onPress={() => navigation.toggleDrawer()} // Abre/fecha o Drawer
            />
          ),
          headerRight: () => (
            <HeaderButton
              onPress={() => {
                console.log('Header button pressed!');
              }}
            />
          ),
        })}
      >
        <Drawer.Screen
          name='index'
          options={{
            drawerLabel: 'Minha Estante',
            headerTitle: 'Minha Estante',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="library" size={size} color={color} />
            ),
            headerRight: () => (
              <HeaderButton
                onPress={() => {
                  console.log('Header button pressed!');
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name='profile'
          options={{
            drawerLabel: 'Meu Perfil',
            headerTitle: 'Meu Perfil',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
