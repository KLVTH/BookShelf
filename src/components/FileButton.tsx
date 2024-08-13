import { Text, TouchableOpacity, View } from 'react-native';

export const FileButton = () => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 20,
          bottom: 50,
          backgroundColor: '#000',
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          console.log('FILE BUTTON PRESSED');
        }}>
        <Text style={{ color: '#fff', fontSize: 35 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
