import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import DriverNavigator from './DriverNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#0F172A' },
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Booking" component={BookingScreen} />
                <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
                <Stack.Screen name="DriverMode" component={DriverNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
