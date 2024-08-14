import { View, Text,TouchableWithoutFeedback,Image, Dimensions } from 'react-native'
import React from 'react'
var {width , height }=Dimensions.get("window")
const MovieCard = ({item}) => {
  return (
    <View>
         <View>
            <TouchableWithoutFeedback>
            {/* <Text className="text-white">{item}</Text> */}
            <Image source={require("../assets/images/moviePoster1.png")}
            style={{width:width*0.6,height:height*0.4}}
            className="rounded-3xl"
            />
            </TouchableWithoutFeedback>
        </View>
    </View>
  )
}

export default MovieCard