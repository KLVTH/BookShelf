import React, { useRef, useState } from 'react';
import { FlatList, SectionList, Text, View } from 'react-native';
import { FileButton } from 'src/components/FileButton';

import { Book } from 'src/components/book';
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
      <View className="border-orange-500 border-b-2">
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
        renderItem={() => <Book />}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.sectionContainer}
        //Talvez seja possível ao implementar a busca por voz a procura pela sessão
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      />
      <FileButton></FileButton>
    </View>
  );
};

export default Home;
