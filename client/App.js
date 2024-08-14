import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import SearchBar from './Components/SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './Components/HomeScreen';
import MyStack from './screens/MyStack';



export default function App() {
  const Stack = createNativeStackNavigator(); 
  return (
    <View className="flex-1 pt-10">
        <MyStack/>
        </View>
  );
}


