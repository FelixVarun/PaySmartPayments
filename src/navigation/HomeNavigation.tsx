import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../home/HomeScreen";
import Checkout from "../home/Checkout";
import Services from "../home/Services";
import ProfileScreen from "../home/ProfileScreen";


const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="Profile" component={ProfileScreen} />


    </Stack.Navigator>
  );
}
