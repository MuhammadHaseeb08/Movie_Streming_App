import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { HeartIcon } from "react-native-heroicons/solid"
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { styles, theme } from '../theme'
import { useNavigation, useRoute } from '@react-navigation/native'
var { width, height } = Dimensions.get("window")
import Upcoming from "../Components/Upcoming"
import { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { Image } from 'react-native'
import axios from "axios"
import Loading from '../Components/Loading'
const Person = () => {
  const [fav, setfav] = useState(false)
  const [load, setload] = useState(false)

  const [personMovies, setpersonMovies] = useState([0, 1, 2, 3, 4])
  const [detail, setDetail] = useState({})
  let { params } = useRoute(
  )
  // console.warn(params)
  let navigation = useNavigation()
  let id = params.id
  console.log(id);
  useEffect(() => {
    let getting = async () => {
      let resp = await axios.post("http://192.168.0.105:4000/pDetail", { id })


      //   console.log(resp.data.data,"asew");
      if (resp.data.success == true) {

        setDetail(resp.data.detail)
        setpersonMovies(resp.data.simiMovies)
        // setTop(resp1.data.data)
        setload(true)

      }
    }
    getting()
  }, [])
  return (

    <View  className="bg-neutral-900 flex-1">
        {
          load?(<ScrollView
            className="bg-neutral-900 flex-1"
            contentContainerStyle={{ paddingBottom: 50 }}
          >
      
            <SafeAreaView className="">
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
            </SafeAreaView>
      
            <View
              className="flex-row justify-center mt-16"
              style={{
                shadowColor: 'gray',
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
              }}
            >
              <View
                className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${detail.profile_path}` }}
                  // source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              </View>
            </View>
      
            <View className=" mt-6">
              <Text className="text-3xl text-white text-center font-bold ">
                {params.name}
              </Text>
              <Text className=" text-neutral-500 text-center  ">
                {detail.place_of_birth}
              </Text>
            </View>
            <View className="mx-5 mt-6">
      
              <View className="flex-row justify-between items-center bg-neutral-500 rounded-3xl p-2 ">
      
      
                <View className="border-r-2 border-r-neutral-400 px-2 item-center ">
                  <Text className="text-md text-white font-bold text-center">Gender</Text>
                  <Text className="text-sm text-neutral-700 ">{detail.gender=1? "Male":"Female"}</Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-2 item-center ">
                  <Text className="text-md text-white font-bold text-center">Birthday</Text>
                  <Text className="text-sm text-neutral-700 ">{detail.birthday}</Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-2 item-center ">
                  <Text className="text-md text-white font-bold text-center">Known for</Text>
                  <Text className="text-sm text-neutral-700 ">{detail.known_for_department}</Text>
                </View>
                <View className=" px-2 item-center ">
                  <Text className="text-md text-white font-bold ">Popularity</Text>
                  <Text className="text-sm text-neutral-700 ">{detail.popularity}</Text>
                </View>
              </View>
      
              <View className="my-6 mx-4 space-y-2">
                <Text className="text-white text-lg">Biography</Text>
                <Text className="text-neutral-400 tracking-wide">
                 {detail.biography.length>150?detail.biography.slice(0, 350) + "...":detail.biography}
                 {/* {item.title.length > 14 ? item.title.slice(0, 14) + "...":item.title} */}
                </Text>
              </View>
              <View>
                <Upcoming data={personMovies} title={"His moives"} showBtn={false} />
              </View>
            </View>
          </ScrollView>):<Loading/>
        }
    
    
    </View>
  )
}

export default Person