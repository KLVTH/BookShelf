import { Text, Pressable, PressableProps } from "react-native"


type CategoryProps = PressableProps & {
  title: string
  isSelected?: boolean
}

export function Category({
  title,
  isSelected = false,
  ...rest
}: CategoryProps) {
  return (
    <Pressable
      className={`h-10 justify-center rounded-full px-4 ${isSelected ? 'bg-black' : ''}`}
      {...rest}>
      <Text className={`text-lg font-bold text-black ${isSelected ? 'text-[#F24E1E]' : ''}`}>{title}</Text>
    </Pressable>
  );
}