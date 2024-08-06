import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from 'expo-router';
import { View, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomerDrawerContent(props: any) {
    const router = useRouter()
    const { top, bottom } = useSafeAreaInsets()

    return (
        <View style={{ flex:1}}>
            <DrawerContentScrollView
                {...props}
                scrollEnabled={false}
                contentContainerStyle={{ backgroundColor: '#dde3fe', paddingTop: top}}>
                
                <View className="p-8">
                    <Image
                        source={require('../assets/ProfilePicTest.png')}
                        className="w-28 h-28 self-center rounded-full"
                    />
                    <Text className="self-center font-medium text-[18px] pt-2.5 text-orange-500">
                        Kauã O. Seixas
                    </Text>
                </View>

                <View className="bg-white pt-2.5">
                    <DrawerItemList {...props} />
                    <DrawerItem label={"Logout"} onPress={() => router.replace('/')} />
                </View>
            </DrawerContentScrollView>
            <View className="border-t-black border-t p-5 pb-${bottom+5}">
                <Text>Bottom</Text>
            </View>
        </View>
    )
}