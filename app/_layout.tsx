/* eslint-disable prettier/prettier */

import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CustomerDrawerContent from "~/components/CustomDrawerContent";


const DrawerLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={CustomerDrawerContent}
                screenOptions={{
                    drawerActiveBackgroundColor: '#5363df',
                    drawerActiveTintColor: '#fff',
                    drawerLabelStyle: { marginLeft: -20 }
                }}>
            <Drawer.Screen
                name='index'
                options={{
                    drawerLabel: 'Minha Estante',
                    headerTitle: 'Minha Estante',
                    drawerIcon: ({ size, color}) => (
                    <Ionicons name="home-outline" size={size} color={color}/>
                )
                }}
            />
            <Drawer.Screen
                name='profile'
                options={{
                    drawerLabel: 'Meu Perfil',
                    headerTitle: 'Meu Perfil',
                    drawerIcon: ({ size, color}) => (
                    <Ionicons name="person-outline" size={size} color={color}/>
                )
                }}
            />
        </Drawer>
    </GestureHandlerRootView>
    )
};

export default DrawerLayout;