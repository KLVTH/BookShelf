import React, { useRef, useState } from 'react';
import { FlatList, SectionList, Text, View, Image } from 'react-native';
import { FileButton } from 'src/components/FileButton';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Category } from 'src/components/category';
import { BOOKS, CATEGORIES } from '../utils/data';
import { styles } from './styles';

const Home = () => {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const sectionListRef = useRef<SectionList>(null);

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory);

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View className="border-b-2 border-orange-500">
        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Category
              title={item}
              onPress={() => handleCategorySelect(item)}
              isSelected={item === category}
            />
          )}
          style={styles.categories}
          contentContainerStyle={{
            gap: 12,
            paddingHorizontal: 32,
          }}
          showsHorizontalScrollIndicator={true}
          horizontal
        />
      </View>

      <SectionList
        style={{ width: '100%' }}
        ref={sectionListRef}
        sections={BOOKS}
        keyExtractor={(item) => item}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: 'gray',
                height: 52,
                width: '100%',
                marginBottom: 16,
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'row', // Alinha a imagem e o texto em uma linha
                alignItems: 'center', // Alinha verticalmente no centro
              }}>
              <Image source={require('src/assets/pdffile.png')} className="h-12 w-12 ml-3" />
              <Text className="ml-3 mr-3 text-xl font-semibold">{item}</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.sectionContainer}
        //Talvez seja possível ao implementar a busca por voz a procurar pela sessão
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      />
      <FileButton></FileButton>
    </View>
  );
};

export default Home;
