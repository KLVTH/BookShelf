import React, { useRef, useState } from 'react';
import { FlatList, Image, SectionList, Text, View } from 'react-native';
import { FileButton } from 'src/components/FileButton';
import { Book } from 'src/components/Book';
import { Category } from '~/src/components/category';
import { BOOKS, CATEGORIES } from '../utils/data';

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
    <View className="flex-1 bg-white pt-2">
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
          className="h-14"
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
            <Book
              title={item}
              imageSource={require('src/assets/pdffile.png')}
              onPress={() => {
                console.log('Button Pressed!');
              }}
            />
          </View>
        )}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 32 }}
        //Talvez seja possível ao implementar a busca por voz a procurar pela sessão
        renderSectionHeader={({ section: { title } }) => (
          <Text className="mb-4 mt-8 text-[22px] font-extrabold text-[#09090A]">{title}</Text>
        )}
      />
      <FileButton></FileButton>
    </View>
  );
};

export default Home;
