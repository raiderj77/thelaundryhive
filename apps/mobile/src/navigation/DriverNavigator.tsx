import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriverDashboardScreen from '../screens/driver/DriverDashboardScreen';
import JobDetailsScreen from '../screens/driver/JobDetailsScreen';

const Stack = createNativeStackNavigator();

export default function DriverNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#0F172A' },
            }}
        >
            <Stack.Screen name="DriverDashboard" component={DriverDashboardScreen} />
            <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
        </Stack.Navigator>
    );
}
