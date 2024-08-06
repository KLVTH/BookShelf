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
                
                <View style={{ padding: 30 }}>
                    <Image
                        source={require('../assets/ProfilePicTest.png')}
                        style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 50 }}
                    />
                    <Text style={{
                        alignSelf: 'center',
                        fontWeight: '500',
                        fontSize: 18,
                        paddingTop: 10,
                        color: '#5363df'
                    }}>
                        Kauã O. Seixas
                    </Text>
                </View>

                <View style={{ backgroundColor: '#fff', paddingTop: 10}}>
                    <DrawerItemList {...props} />
                    <DrawerItem label={"Logout"} onPress={() => router.replace('/')} />
                </View>
            </DrawerContentScrollView>
            <View style={{
                borderTopColor: '#dde3fe',
                borderTopWidth: 1,
                padding: 20,
                paddingBottom: 20 + bottom
            }}>
                <Text>Bottom</Text>
            </View>
        </View>
    )
}