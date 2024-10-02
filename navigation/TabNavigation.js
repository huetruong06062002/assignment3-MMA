import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeStack, FavoriteStack } from "./StackNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomTabBar from '../components/CustomTabBar.js'; 

enableScreens();

const Tab = createMaterialTopTabNavigator();

const TabNavigation = () => {
  return (
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          unmountOnBlur: true,
          swipeEnabled: true, // Enable swipe gestures 
        }}
        tabBarPosition="bottom"
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,  
            tabBarIconName: "home",
          }}
        />
        <Tab.Screen
          name="Wishlist"
          component={FavoriteStack}
          options={{
            headerShown: false,
            tabBarIconName: "favorite",
          }}
        />
      </Tab.Navigator>
  );
};

export default TabNavigation;