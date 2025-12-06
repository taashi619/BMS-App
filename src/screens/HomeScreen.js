import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

const bicycles = [
  { id: "1", name: "Mountain Bike", image: "https://via.placeholder.com/150" },
  { id: "2", name: "City Bicycle", image: "https://via.placeholder.com/150" },
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  return (
    <View className="flex-1 bg-white dark:bg-black px-4 pt-6">
      <Text className="text-2xl font-bold mb-4 text-black dark:text-white">
        Available Bicycles
      </Text>

      <TextInput
        placeholder="Search bicycle..."
        className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl mb-4 text-black dark:text-white"
        onChangeText={setSearch}
      />

      <FlatList
        data={bicycles.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl mb-3 flex-row items-center"
            onPress={() => navigation.navigate("BicycleDetails", { bicycle: item })}
          >
            <Image source={{ uri: item.image }} className="w-16 h-16 rounded-xl mr-4" />
            <Text className="text-lg text-black dark:text-white">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
