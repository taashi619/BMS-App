import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function BicycleDetailsScreen({ route }) {
  const { id } = route.params;
  const [bicycle, setBicycle] = useState(null);

  useEffect(() => {
    // Dummy data matching what we have in BicycleListScreen
    const dummyBicycles = [
      { 
        id: 1, 
        name: "Mountain Bike", 
        status: "Available",
        model: "Explorer Pro 2023",
        type: "Mountain",
        price: 25,
        location: "Central Park Station",
        description: "Perfect for rough terrains and mountain trails"
      },
      { 
        id: 2, 
        name: "Road Bike", 
        status: "In Use",
        model: "Speedster X1",
        type: "Road",
        price: 30,
        location: "Downtown Hub",
        description: "Lightweight and fast for city roads"
      },
      { 
        id: 3, 
        name: "City Bike", 
        status: "Available",
        model: "Urban Commuter",
        type: "City",
        price: 15,
        location: "Westside Terminal",
        description: "Comfortable ride for daily commuting"
      },
      { 
        id: 4, 
        name: "Electric Bike", 
        status: "Maintenance",
        model: "E-Thunder 5000",
        type: "Electric",
        price: 35,
        location: "Tech District",
        description: "Electric assist for longer rides"
      },
      { 
        id: 5, 
        name: "Folding Bike", 
        status: "Available",
        model: "Compact Fold Pro",
        type: "Folding",
        price: 18,
        location: "Airport Terminal",
        description: "Easy to fold and carry anywhere"
      },
    ];

    // Find the bicycle with matching ID
    const foundBicycle = dummyBicycles.find(bike => bike.id === id);
    setBicycle(foundBicycle);
    
    // Keep your API call commented out for now
    // api.get(`/bicycles/${id}`).then(res => setBicycle(res.data));
  }, [id]);

  if (!bicycle) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{bicycle.name}</Text>
      <Text style={{ fontSize: 18, marginBottom: 5 }}>Model: {bicycle.model}</Text>
      <Text style={{ fontSize: 18, marginBottom: 5 }}>Type: {bicycle.type}</Text>
      <Text style={{ fontSize: 18, marginBottom: 5, color: bicycle.status === 'Available' ? 'green' : bicycle.status === 'In Use' ? 'orange' : 'red' }}>
        Status: {bicycle.status}
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 5 }}>Price: ${bicycle.price}/hour</Text>
<Text style={{ fontSize: 18, marginBottom: 5 }}>Location: {bicycle.location}</Text>
<Text style={{ fontSize: 16, marginTop: 15, color: '#666' }}>{bicycle.description}</Text>
</View>
);
}