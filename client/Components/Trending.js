import { View, Text,Image, Dimensions, TouchableWithoutFeedback,TouchableOpacity } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import axios from "axios"
var {width , height }=Dimensions.get("window")
import { useEffect,useState } from 'react'
const Trending = () => {
  let [data,setdata]=useState([])
  let [load,setload]=useState(true)
    useEffect(() => {
      let getting=async()=>{
        let resp= await axios.get("http://192.168.0.105:4000/trending")
        // console.log(resp.data.data,"asew");
        if (resp.data.success==true) {
          setdata(resp.data.data)
          setload(false)
          
        }
      }
      getting()
    }, [])
    console.log(data);
    // let data=[1,2,3,4]
    // let navigation= useNavigation()
    let navigation= useNavigation()
    let handleClick= (item)=>{
        navigation.navigate("Movie",item)
    }
  return (
    <View className="mb-5"> 
      <Text className="text-white text-xl m-3">Trending</Text>

      <Carousel
      data={data}
      renderItem={({item})=><MovieCard item={item} handleClick={handleClick}/>}
      firstItem={1}
      inactiveSlideOpacity={0.6}
      sliderWidth={width}
      itemWidth={width*0.6}
      slideStyle={{display:"flex", alignItems:"center"}}
      />
    </View>
  )
}

let MovieCard=({item,handleClick})=>{
    return(
        <View >
            <TouchableOpacity
            onPress={()=>{handleClick(item)}}
            >
            {/* <Text className="text-white">{item}</Text> */}
            <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}}
            style={{width:width*0.6,height:height*0.4}}
            className="rounded-3xl"
            />
            </TouchableOpacity>
        </View>
    )
}

export default Trending