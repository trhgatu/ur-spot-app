import { LocationCard } from "@/components/home/LocationCard"
import { Location } from "@/types/location"
import { useCategoryStore } from "@/store/categoryStore"
import { View, Text, FlatList } from "react-native"

interface LocationsGridProps {
  locations: Location[]
  onResetFilters: () => void
}

export function LocationsGrid({ locations, onResetFilters }: LocationsGridProps) {
  const { categoryList } = useCategoryStore()

  if (locations.length === 0) {
    return (
      <View style={{ paddingVertical: 48, paddingHorizontal: 24, borderRadius: 12, borderWidth: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{
            width: 64, height: 64, borderRadius: 32,
            backgroundColor: '#E0E0E0', marginBottom: 20, justifyContent: 'center', alignItems: 'center'
          }}>
          </View>
          <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>Không tìm thấy địa điểm</Text>
          <Text style={{ fontSize: 14, textAlign: 'center', color: '#666' }}>
            Không có địa điểm nào phù hợp với bộ lọc hiện tại của bạn. Hãy thử điều chỉnh bộ lọc để tìm kiếm lại.
          </Text>
        </View>
      </View>
    )
  }

  const renderItem = ({ item }: { item: Location }) => {
    const category = categoryList?.data?.find(cat => cat._id === item.categoryId) ||
      categoryList?.allCategory?.find(cat => cat._id === item.categoryId)

    return (
      <View style={{ flex: 1, margin: 8 }}>
        <LocationCard
          {...item}
          category={category || { _id: item.categoryId, name: "Unknown", description: "", slug: "", icon: "" }}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>
          {locations.length} địa điểm được tìm thấy
        </Text>
      </View>

      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 24 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  )
}
