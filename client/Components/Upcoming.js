import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { styles, theme } from '../theme'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
var { width, height } = Dimensions.get("window")
import { useEffect,useState } from 'react'

const Upcoming = ({ title,showBtn,url,data }) => {
    let name = 'Ant-Man and the Wasp: Quantumania'
    let navigation= useNavigation()
    // let [data,setdata]=useState([])
    // let [load,setload]=useState()
    // useEffect(() => {
    //     let getting=async()=>{
    //       let resp= await axios.get(`http://192.168.0.103:4000/${url}`)
    //     //   console.log(resp.data.data,"asew");
    //       if (resp.data.success==true) {
    //         setdata(resp.data.data)
    //         setload(false)
            
    //       }
    //     }
    //     getting()
    //   }, [])
    return (
        <View className="mx-3  mb-5">
            <View className="flex-row justify-between items-center ">

                <View><Text className="text-white font-semibold text-xl">{title}</Text></View>
                {
                    showBtn ? (<TouchableOpacity>
                        {/* <Text className=" text-lg" style={styles.text}>See All</Text> */}
                    </TouchableOpacity>):""
                }
            </View>
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}



                >
                    {
                        data.map((item, i) => {
                            return (

                                <TouchableOpacity key={i}
                                onPress={()=>{navigation.push("Movie",item)}}
                                >
                                    <View className="rounded-3xl p-2 items-center">
                                        <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{ width: width * 0.32, height: height * 0.22 }}
                                            className="rounded-3xl"
                                        />
                                        <Text className="text-neutral-200">{item.title.length > 14 ? item.title.slice(0, 14) + "...":item.title}
                                            
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                            )
                        })
                    }

                </ScrollView>
            </View>
        </View>
    )
}

export default Upcoming