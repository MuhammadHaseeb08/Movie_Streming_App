import { View, Text,TextInput,TouchableOpacity,ScrollView,TouchableWithoutFeedback,Image, Dimensions } from 'react-native'
import React from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState,useCallback } from 'react'

import axios from "axios"
var {width , height }=Dimensions.get("window")

const SearchScreen = () => {

  let navigation =useNavigation()
  const [results, setresults] = useState([])
  let [load,setLoading]=useState(false)
//   console.log(results);
  let handleChange= (search)=>{
        // console.log(text);
        // if(search && search.length>2){
        //     setLoading(true);
        //     searchMovies({
        //         query: search,
        //         include_adult: false,
        //         language: 'en-US',
        //         page: '1'
        //     }).then(data=>{
        //         console.log('got search results');
        //         setLoading(false);
        //         if(data && data.results) setresults(data.results);
        //     })
        // }else{
        //     setLoading(false);
        //     setresults([])
        // }
      
        let getting=async()=>{
            let resp= await axios.post("http://192.168.0.105:4000/search",{search})
            if (resp.data.success==true) {
                    setresults(resp.data.data)
                    setLoading(true)
                
            }
        }
        getting()   
  }
  const handleTextDebounce = useCallback(debounce(handleChange, 400), []);  
  
  return (
    <SafeAreaView className="bg-neutral-800 flex-1 pt-5">
             <View 
            className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full" >
            <TextInput 
                onChange={handleTextDebounce} 
                placeholder="Search Movie" 
                placeholderTextColor={'lightgray'} 
                className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider" 
            />
            <TouchableOpacity 
                onPress={()=> navigation.navigate('Home')}
                className="rounded-full p-3 m-1 bg-neutral-500" 
            >
                <XMarkIcon size="25" color="white" />
                
            </TouchableOpacity>
        </View>
{
         results.length>0? (
          <ScrollView 
              showsVerticalScrollIndicator={false} 
              contentContainerStyle={{paddingHorizontal:15}}
              className="space-y-3"
          >
              <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
              <View className="flex-row justify-between flex-wrap">
                  {
                      results.map((item, index)=>{
                          return (
                              <TouchableWithoutFeedback 
                                  key={index} 
                                  onPress={()=> navigation.push('Movie', item)}>
                                  <View className="space-y-2 mb-4">
                                      <Image 
                                          // source={{uri: image185(item.poster_path) || fallbackMoviePoster}} 
                                          source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}}
                                          className="rounded-3xl" 
                                          style={{ width: width*0.44, height: height*0.3}} 
                                      />
                                      <Text className="text-gray-300 ml-1">
                                          {/* {
                                              item.title.length>22? item.title.slice(0,22)+'...': item.title
                                          } */}
                                          {item.title.length>14?item.title.slice(0,14)+"...":item.title}
                                      </Text>
                                  </View>
                              </TouchableWithoutFeedback>
                          )
                      })
                  }
              </View>
              
          </ScrollView>
      ):(
          <View className="flex-row justify-center">
              <Image 
                  source={require('../assets/images/movieTime.png')} 
                  className="h-96 w-96"
              />
          </View>
      )
  }

    </SafeAreaView>
  )
}

export default SearchScreen