import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import api from "../api/axios";

export default function BicycleListScreen({ navigation }) {
  const [bicycles, setBicycles] = useState([]);

  useEffect(() => {
    // Dummy data - exactly what you need
    const dummyBicycles = [
      { id: 1, name: "Mountain Bike", status: "Available" },
      { id: 2, name: "Road Bike", status: "In Use" },
      { id: 3, name: "City Bike", status: "Available" },
      { id: 4, name: "Electric Bike", status: "Maintenance" },
      { id: 5, name: "Folding Bike", status: "Available" },
    ];
    
    setBicycles(dummyBicycles);
    
    // Keep your API call commented out for now
    // api.get("/bicycles").then(res => {
    //   setBicycles(res.data);
    // });
  }, []);

  return (
    <FlatList
      data={bicycles}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("BicycleDetails", { id: item.id })}>
          <View style={{ padding: 20, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}