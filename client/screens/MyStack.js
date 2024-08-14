import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
// import SearchBar from './Components/SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './Components/HomeScreen';
import Home from './Home';
import MovieScreen from './MovieScreen';
import Person from './Person';
import SearchScreen from "./SearchScreen"

export default function MyStack() {
  const Stack = createNativeStackNavigator(); 
  return (
    <NavigationContainer>
    <Stack.Navigator >
    <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
    <Stack.Screen name="Movie" component={MovieScreen} options={{headerShown:false}} />
    <Stack.Screen name="Person" component={Person} options={{headerShown:false}} />
    <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown:false}} />



    </Stack.Navigator>
    </NavigationContainer>
  );
}


