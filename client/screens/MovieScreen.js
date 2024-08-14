import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { styles, theme } from '../theme'
import { HeartIcon } from "react-native-heroicons/solid"
import { useState,useEffect } from 'react'
var { width, height } = Dimensions.get("window")
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../Components/Cast'
// import Upcoming from './Upcoming'
// import Upcoming from "./Upcoming/Upcoming"
import Upcoming from "../Components/Upcoming"
import axios from "axios"
import Loading from '../Components/Loading'


const MovieScreen = () => {

    const { params } = useRoute()
    // console.log(params);
    let navigation = useNavigation()
    const [fav, setfav] = useState(false)
    const [cast, setcast] = useState([])
    const [data,setdata]=useState([])
    // let navigation=useNavigation()
    const [similar, setsimilar] = useState([])
    const [detail,setDetail]=useState({})
    const[load,setload]=useState(false)
    let name = 'Ant-Man and the Wasp: Quantumania'
    let id=params.id
    // console.log(id,"jf");
    useEffect(() => {
        let getting=async()=>{
          let resp= await axios.post("http://192.168.0.105:4000/detail",{id})
        
    
        //   console.log(resp.data.data,"asew");
          if (resp.data.success==true) {
            setcast(resp.data.castData)
            setsimilar(resp.data.simiMovies)
            setDetail(resp.data.detail)
            // setTop(resp1.data.data)
            setload(true)
            
          }
        }
        getting()
      }, [])
        // console.log(detail.genres);
    return (
      <View className="bg-neutral-900 flex-1">

            {
                load? (
                    <ScrollView
                    className="bg-neutral-900 flex-1"
                    contentContainerStyle={{ paddingBottom: 50 }}
                >
                    <View className="w-full">
                    {/* <SafeAreaView> */}
    
                    <View className="relative" >
                        <Image source={{uri:`https://image.tmdb.org/t/p/w500${detail.backdrop_path}`}} className="" style={{ width: width, height: height * 0.55 }} />
                        <LinearGradient colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
                            style={{ width: width, height: height * 0.4 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="absolute bottom-0"
                        />
                    </View>
                    <View className="absolute left-3 top-3">
                        <TouchableOpacity className=" rounded-xl p-1" style={styles.background}
                            onPress={() => navigation.goBack()}
                        >
    
                            <ChevronLeftIcon size="28" stroke="white" strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>
    
                    <View className="absolute right-3 top-3">
                        <TouchableOpacity className="  p-1"
                            onPress={() => setfav(!fav)}
                        >
    
                            <HeartIcon size="35" stroke="" strokeWidth={2.5} color={fav ? theme.background : "white"} />
                        </TouchableOpacity>
                    </View>
                    {/* </SafeAreaView> */}
                    <View className="space-y-3 " style={{ marginTop: -(height * 0.09) }}>
    
                        <Text className="text-white text-3xl items-center text-center font-bold " >{detail.original_title}</Text>
                        <Text className="text-neutral-400 text-base items-center text-center font-semibold">{detail.release_date}.{detail.status}. {detail.runtime} min</Text>
                        <View className="flex-row justify-center space-x-3">
                            {/* <Text className="text-neutral-400 text-base items-center text-center font-semibold">Comedy.</Text>
                            <Text className="text-neutral-400 text-base items-center text-center font-semibold">Thrill.</Text>
                            <Text className="text-neutral-400 text-base items-center text-center font-semibold"> Drama</Text> */}
                            {
                              detail.genres.length>0 ?(
                                detail.genres.map(
                                    (item)=>{
                                            return(
                                                <Text className="text-neutral-400 text-base items-center text-center font-semibold">{item.name}.</Text>
                                            )
                                    }
                                )
                              ):""
                              
                              
                            }
                        </View>
                        <View>
                            <Text className="text-neutral-400   font-semibold tracking-wide mx-4"> {detail.overview}</Text>
    
                        </View>
                        <View className="">
                            <Cast data={cast} />
                        </View>
                        <Upcoming title={"Similar Movies"} data={similar} showBtn={false}/>
                    </View>
    
                </View>
        </ScrollView>
                ):<Loading/>
            }
            </View>
           


    )
}

export default MovieScreen


