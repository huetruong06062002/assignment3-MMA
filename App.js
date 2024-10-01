import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./navigation/TabNavigation";
import { RootSiblingParent } from "react-native-root-siblings";
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              component={TabNavigation}
              name="MainScreen"
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    </>
  );
}
