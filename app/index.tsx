import React, { useRef, useState } from "react"
import { FlatList, SectionList, Text, View } from "react-native"

import { styles } from "./styles"
import { CATEGORIES, BOOKS } from "../utils/data"

import { Book } from "../components/book"
import { Category } from "../components/category"

const Home = () => {
  const [category, setCategory] = useState(CATEGORIES[0])
  const sectionListRef = useRef<SectionList>(null)

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    )

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }

  return (
    <View style={styles.container}>
      <View className="border-b-2 border-custom-light-gray ">
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
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>

      <SectionList style={{width: '100%'}}
        ref={sectionListRef}
        sections={BOOKS}
        keyExtractor={(item) => item}
        stickySectionHeadersEnabled={false}
        renderItem={() => <Book />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.sectionContainer}
        //Talvez seja possível ao implementar a busca por voz a procura pela sessão
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  )
}

export default Home

