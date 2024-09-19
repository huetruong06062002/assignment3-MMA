import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();


const TabNavigation = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
                unmountOnBlur: true,
            }}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Detail" component={DetailStack} />
            <Tab.Screen name="Favorite" component={FavoriteStack} />
        </Tab.Navigator>
    )
};

export default TabNavigation;