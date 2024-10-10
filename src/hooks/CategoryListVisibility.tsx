// hooks/CategoryListVisibility.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CategoryListContextType = {
  isListVisible: boolean;
  toggleListVisibility: () => void;
};

const CategoryListContext = createContext<CategoryListContextType | undefined>(
  undefined,
);

export const CategoryListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isListVisible, setIsListVisible] = useState<boolean>(true);

  useEffect(() => {
    const loadVisibility = async () => {
      const storedVisibility = await AsyncStorage.getItem("isListVisible");
      if (storedVisibility !== null) {
        setIsListVisible(storedVisibility === "true");
      }
    };

    loadVisibility();
  }, []);

  const toggleListVisibility = async () => {
    const newVisibility = !isListVisible;
    setIsListVisible(newVisibility);
    await AsyncStorage.setItem("isListVisible", JSON.stringify(newVisibility));
  };

  return (
    <CategoryListContext.Provider
      value={{ isListVisible, toggleListVisibility }}
    >
      {children}
    </CategoryListContext.Provider>
  );
};

export const useCategoryListVisibility = (): CategoryListContextType => {
  const context = useContext(CategoryListContext);
  if (!context) {
    throw new Error(
      "useCategoryListVisibility must be used within a CategoryListProvider",
    );
  }
  return context;
};
