import CameraScreen from "./../Views/CameraView/CameraScreen";
import CompareScreen from "./../Views/CompareView/CompareScreen";
import DataScreen from "./../Views/DataView/DataScreen";
import DatabaseTesterScreen from "./../Views/DatabaseTesterView/DatabaseTesterScreen";
import ProductSingleScreen from "./../Views/ProductView/ProductSingleScreen";
import HomeExampleScreen from "./../Views/HomeView/HomeScreen";
import ScreenExampleScreen from "./../Views/ScreenExampleView/ScreenExampleScreen";
import ListScreen from "./../Views/ListView/ListScreen";
import LandingScreen from "./../Views/LandingView/LandingScreen";
import LoginScreen from "./../Views/LoginView/LoginScreen";
import PreferencesScreen from "./../Views/PreferenceView/PreferencesScreen";
import ServerScreen from "./../Views/ServerView/ServerScreen";
import HomeScreen from "./../Views/HomeView/HomeScreen";
import CustomHeader from "./CustomHeader";

import { useSelector, useDispatch } from 'react-redux'
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



const Stack = createStackNavigator();
const initialScreen = "ListScreen"; //ProductSingleScreen 

export default function AppWrapper() {

    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName={initialScreen}
                screenOptions={{ headerLeft: null }}
            >
                <Stack.Screen
                    name="LandingScreen"
                    component={LandingScreen}
                    options={{ title: "LandingScreen" }, { headerShown: false }}
                />
                <Stack.Screen name="ScreenExample" component={ScreenExampleScreen} />
                <Stack.Screen name="ListScreen" component={ListScreen}
                    options={{
                        headerTitle: props => <CustomHeader {...props}
                            title="Scanned List" />
                    }} />

                <Stack.Screen name="LoginScreen" component={LoginScreen}
                    options={{
                        headerTitle: props => <CustomHeader {...props}
                            title="Sign In" />
                    }} />

                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerTitle: props => <CustomHeader {...props} navigator={Stack.Navigator} title="" /> }}
                />
                <Stack.Screen name="Camera" component={CameraScreen} />
                <Stack.Screen name="DataScreen" component={DataScreen}
                    options={{ headerTitle: props => <CustomHeader {...props} title="Statistics" /> }}

                />
                <Stack.Screen name="PreferencesScreen" component={PreferencesScreen}
                    options={{ headerTitle: props => <CustomHeader {...props} title="Preferences" /> }}

                />
                <Stack.Screen name="ServerScreen" component={ServerScreen} />
                <Stack.Screen
                    name="ProductSingleScreen"
                    component={ProductSingleScreen}
                    options={{ headerTitle: props => <CustomHeader {...props} title="Product Screen" /> }}

                />
                <Stack.Screen
                    name="CompareScreen"
                    component={CompareScreen}
                    options={{ headerTitle: props => <CustomHeader {...props} title="Comparison" /> }}

                />
                <Stack.Screen
                    name="DatabaseTesterScreen"
                    component={DatabaseTesterScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>)
}