import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/HomeScreen";
import FaveriteScreen from "../screen/FaveriteScreen";
import DetailScreen from "../screen/DetailScreen";

const Stack = createStackNavigator();

// Stack for home page
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
      />
    </Stack.Navigator>
  );
}

// Stack for product detail
const DetailStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="DetailScreen" 
        component={DetailScreen} 
      />
    </Stack.Navigator>
  );
}

// Stack for favorite list product
const FavoriteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FaveriteScreen" 
        component={FaveriteScreen} 
      />
    </Stack.Navigator>
  );
}

export { HomeStack, DetailStack, FavoriteStack };