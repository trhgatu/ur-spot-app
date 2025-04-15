import React from 'react';
import { Button } from 'react-native';
import { View, Text } from 'react-native';

export default function TrialScreen() {
  return (
    <View className="flex-1 justify-center items-center px-6">
      <Text className="text-2xl font-bold mb-4">🎉 Trial Screen</Text>

      <View className="mb-4 space-y-1">
        <Text className="">This is a trial screen for layout testing.</Text>
        <Text className="">You can add more components here.</Text>
        <Text className="">Feel free to customize it as needed.</Text>
        <Text className="">This is a simple layout in React Native.</Text>
      </View>

      <Text className="text-lg mb-4">Welcome to Your App!</Text>

      <Button title="Press Me" onPress={() => alert('Button pressed!')} />

      <View className="mt-6">
        <Text className="text-sm">© 2025 Your App</Text>
      </View>
    </View>
  );
}
