import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,SafeAreaView,TextInput, ScrollView } from 'react-native';
// import SearchBar from './Components/SearchBar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  let navigation=useNavigation()
  return (
    <View className="flex-row justify-between items-center mx-3 mt-2">
      <View>
        <Bars3CenterLeftIcon stroke="white" size="30" strokeWidth="2"/>
      </View>
      <View>
        <Text className="text-white font-bold text-3xl ">  <Text style={styles.text}>M</Text>ovies</Text>
      </View>
      <View>
        <MagnifyingGlassIcon stroke="white" size="30" strokeWidth="2" onPress={()=>navigation.navigate("SearchScreen")}/>
      </View>
       
    </View>
  )
}

export default SearchBar