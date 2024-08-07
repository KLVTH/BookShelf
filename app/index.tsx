import { View, Text } from 'react-native';
import SearchBox from '../components/SearchBox'; 

const Home = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="bg-orange-500 font-bold">teste</Text>
            <SearchBox />
        </View>
    );
};

export default Home;