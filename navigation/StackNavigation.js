import React from "react";
import { createStackNavigator } from "@react-navigation/stack";




const stack = createStackNavigator();

//stack nay cho home page
const HomeStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Home" component={HomeScreen} />
    </stack.Navigator>
  );
}

//stack nay cho product detail
const DetailStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="Detail" component={DetailScreen} />
        </stack.Navigator>
    );
}

// Stack này cho favorite list product
const FavoriteStack = () => {
    return(
        <stack.Navigator>
            <stack.Screen name="Favorite" component={FavoriteScreen} />
        </stack.Navigator>
    )
}

