import { View, Text, ScrollView,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { useState } from 'react'

const Cast = ({data}) => {
    let navigation=useNavigation()
  return (
    <View className="mx-5 ">
      <Text className="text-white font-semibold text-xl">Top Cast</Text>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:15}}

      >
            {
                data?
                data.map((item,i)=>{
                    return(
                      <TouchableOpacity key={i} onPress={()=>navigation.navigate("Person",item)}>
                        <View className="p-2">
                            <View className=" overflow-hidden rounded-full h-20 w-20 border-neutral-700 border-2"
                            
                            >
                            <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.profile_path}`}} className="w-20 h-24 rounded-2xl "/>
                           
                            </View>
                            <Text className="text-neutral-200">{item.name.length > 14 ? item.name.slice(0, 14) + "...":item.name}
                                            
                                            </Text>
                        </View>
                        </TouchableOpacity>
                    )
                }):""
            }
      </ScrollView>
      
    </View>
  )
}

export default Cast