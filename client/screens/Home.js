import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import SearchBar from '../Components/SearchBar'
import Trending from '../Components/Trending'
import Upcoming from '../Components/Upcoming'
import { useState,useEffect } from 'react'
import axios from "axios"
import Loading from '../Components/Loading'
const Home = () => {
  const [Upcomingd, setUpcoming] = useState([])
  const [top,setTop]=useState([])
  const [load,setload]=useState(false)
  useEffect(() => {
    let getting=async()=>{
      let resp= await axios.get("http://192.168.0.101:4000/upComing")
      let resp1= await axios.get("http://192.168.0.101:4000/topRated")

      // console.log(resp.data.data,"asew");
      if (resp.data.success==true) {
        setUpcoming(resp.data.data)
        setTop(resp1.data.data)
        setload(true)
        
      }
    }
    getting()
  }, [])
  
  
  return (
    <View className="flex-1 bg-neutral-800">
        <View>
            <SearchBar/>
        </View>

        {
          load? <View>
          <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingBottom:30}}
          >
            <Trending/>
            <View className=""><Upcoming title={"Up Coming"} data={Upcomingd} showBtn={true} url={"upComing"}/></View>
            <View className=""><Upcoming title={"Top Rated"} data={top} showBtn={true} url={"topRated"}/></View>
  
          </ScrollView>
          </View>:<Loading/>
        }
       
      
    </View>
  )
}

export default Home