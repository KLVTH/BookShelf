import { Ionicons } from '@expo/vector-icons';
import { useFonts, PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import '../../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CustomerDrawerContent from '~/src/components/CustomDrawerContent';
import CustomDrawerScreenOptions from '~/src/components/CustomDrawerScreenOptions';

const DrawerLayout = () => {
  //Não é a forma ideal de implantar uma fonte, necessário revisão
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={CustomerDrawerContent} screenOptions={CustomDrawerScreenOptions}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Minha Estante',
            headerTitle: 'Minha Estante',
            drawerIcon: ({ size, color }) => <Ionicons name="library" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Meu Perfil',
            headerTitle: 'Meu Perfil',
            drawerIcon: ({ size, color }) => <Ionicons name="person" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="config"
          options={{
            drawerLabel: 'Configurações',
            headerTitle: 'Configurações',
            drawerIcon: ({ size, color }) => <Ionicons name="settings" size={size} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;