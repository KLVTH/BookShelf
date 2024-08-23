import React from 'react';
import { Image, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type CustomButtonProps = {
  title: string; // Texto que será exibido no botão
  imageSource: any; // Fonte da imagem
} & TouchableOpacityProps; // Permite passar propriedades adicionais do TouchableOpacity

export function Book({ title, imageSource, ...touchableProps }: CustomButtonProps) {
  return (
    <TouchableOpacity
      className="mb-4 h-14 w-full flex-row items-center rounded-lg bg-gray-500" // Usando NativeWind para estilos
      {...touchableProps}>
      <Image source={imageSource} className="ml-3 h-5 w-5" />
      <Text className="ml-3 mr-3 text-xl font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
