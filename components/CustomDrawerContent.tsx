//Adiciona uma imagem de perfil com nome

import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from 'expo-router';
import { View, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomDrawerContent(props: any) {
    const router = useRouter()
    const { top, bottom } = useSafeAreaInsets() //Obtém os valores das margens seguras no topo e na parte inferior da tela.

    //DrawerItemList - Renderiza a lista de itens do drawer.    
    //DrawerItem - Adiciona o item logout, que ao ser pressionado redireciona o usuário para a página inicial usando router.replace('/')

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
                    <DrawerItem
                        label={"Logout"}
                        onPress={() => router.replace('/')}
                        icon={({size, color}) => (
                            <Ionicons name="log-out" size={size} color={color} />
                        )}
                        
                    />
                </View>

            </DrawerContentScrollView>
            <View className="border-t-black border-t p-5 pb-${bottom+5}">
                <Text>Rodapé</Text>
            </View>
        </View>
    )
}