/* eslint-disable prettier/prettier */

import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from 'expo-router';
import { View } from "react-native";

export default function CustomerDrawerContent(props: any) {
    const router = useRouter()


    return (
        <View style={{ flex:1}}>
            <DrawerContentScrollView
                {...props}
                scrollEnabled={false}
                contentContainerStyle={{ backgroundColor: '#dde3fe'}}>
            <DrawerItemList {...props} />
            <DrawerItem label={"Logout"} onPress={() => router.replace('/')}/>
        </DrawerContentScrollView>
        </View>
    )
}