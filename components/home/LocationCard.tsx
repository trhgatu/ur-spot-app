import { Text, View, Image } from "react-native"
import { Category } from "@/types/category"
import { useState } from "react"
import { Ionicons } from '@expo/vector-icons';

interface LocationCardProps {
  _id: string
  name: string
  description: string
  images: string[]
  averageRating: number
  address: string
  category: Category
}

export function LocationCard({
  _id,
  name,
  description,
  images,
  category,
  averageRating,
  address,
}: LocationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const imageUrl =
    images && images.length > 0
      ? images[0]
      : "https://placehold.co/600x400/gray/white?text=No+Image"

  return (
    <View className="w-full max-w-[360px] overflow-hidden rounded-lg border border-gray-400 shadow-black mb-4">
      <Image source={{ uri: imageUrl }} className="w-full h-[200px]"/>
      <View className="absolute px-2 flex-row items-center bg-yellow-400 top-2 right-2 rounded-lg">
        <Text className="font-sm">{averageRating}</Text>
        <Ionicons className="pl-1" name="star" size={12} color="black" />
      </View>

      <View className="p-3">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold mr-2 line-clamp-1">{name}</Text>
        </View>

        <Text className="text-sm mb-1 line-clamp-2">{address}</Text>
        <Text className="text-sm text-gray-500 mb-1">Mở cửa: 8:00 - 22:00</Text>
        <Text className="text-sm text-gray-700 line-clamp-2">{description}</Text>
      </View>
    </View>
  )
}
