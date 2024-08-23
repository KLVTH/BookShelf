
// Faz algumas configurações de estilo para o drawer e para o header
//Define também o header presente em todos os Drawer

import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import { SearchButton } from 'src/components/SearchButton';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';

type DrawerScreenOptionsProps = {
    navigation: DrawerNavigationProp<ParamListBase>;
};

const DrawerScreenOptions = ({ navigation }: DrawerScreenOptionsProps) => ({
    drawerActiveBackgroundColor: '#F24E1E',
    drawerActiveTintColor: '#fff',
    drawerLabelStyle: { marginLeft: -20 },
    headerstyle: {
        
    },
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
        <SearchButton
            onPress={() => {
                console.log('Header button pressed!');
            }}
        />
    ),
});

export default DrawerScreenOptions;
