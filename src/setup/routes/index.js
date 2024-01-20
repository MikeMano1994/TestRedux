import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./../../screens/SplashScreen";
import QRScanScreen from "../../screens/QRScanScreen";
import CartScreen from "./../../screens/CartScreen";
import CheckOutScreen from "./../../screens/CheckOutScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QRScanScreen"
        component={QRScanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckOutScreen"
        component={CheckOutScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
const NavigationProvider = () => {
  return <AuthStack />;
};
export default NavigationProvider;