import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useLocationStore } from '@/store/locationStore';
import { useCategoryStore } from '@/store/categoryStore';
import { LocationsGrid } from '@/components/home/LocationGrid';

export default function TrialScreen() {
  const { locationList, fetchAllLocations } = useLocationStore();
  const { categoryList, fetchAllCategories } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("Tất cả thành phố")
  const [selectedDistrict, setSelectedDistrict] = useState("Tất cả quận")

  useEffect(() => {
    fetchAllLocations()
    fetchAllCategories()
  }, [fetchAllLocations, fetchAllCategories])

  const filteredLocations = locationList?.allLocation?.filter((location) => {
    const matchesCategory = selectedCategory === "Tất cả" ||
      categoryList?.data?.find((category) => category._id === location.categoryId)?.name === selectedCategory
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = selectedCity === "Tất cả thành phố" || location.city === selectedCity
    const matchesDistrict = selectedDistrict === "Tất cả quận" || location.district === selectedDistrict
    return matchesCategory && matchesSearch && matchesCity && matchesDistrict
  }) || []

  const handleResetFilters = () => {
    setSelectedCategory("Tất cả")
    setSearchQuery("")
    setSelectedCity("Tất cả thành phố")
    setSelectedDistrict("Tất cả quận")
  }

  return (
    <View className='flex-1 px-4 pt-10 bg-slate-100'>
      <Text className="text-2xl font-bold mb-4">Khám phá địa điểm cho riêng bạn.</Text>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Tìm kiếm địa điểm..."
        style={{
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 8,
          paddingLeft: 10,
          marginBottom: 20,
        }}
      />
      <View className="flex-row mb-4">
        <TouchableOpacity onPress={() => setSelectedCategory(selectedCategory === 'Tất cả' ? 'Địa điểm khác' : 'Tất cả')}>
          <Text>{selectedCategory}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCity('Tất cả thành phố')}>
          <Text>{selectedCity}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedDistrict('Tất cả quận')}>
          <Text>{selectedDistrict}</Text>
        </TouchableOpacity>
      </View>
      <LocationsGrid
        locations={filteredLocations}
        onResetFilters={handleResetFilters}
      />
    </View>
  );
}
