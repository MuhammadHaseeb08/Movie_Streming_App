const express = require("express");
const app = express();
const cors = require('cors');
const axios=require("axios")
app.use(express.json());
app.use(cors());
let apiKey="65e6a1b7731004923127990ce8c2a70d"

const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
// 'https://api.themoviedb.org/3/movie/movie_id/credits?language=en-US';
'https://api.themoviedb.org/3/movie/346698?language=en-US';




app.listen(4000, () => {
    console.log("sener is listening");
  });

  app.get("/trending",async(req,res)=>{
    // const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    try {
        let data=await axios.get(trendingMoviesEndpoint)
        // let arr= data.results
        let arr=data.data.results
        // console.log(arr);
        if (arr) {
          res.json({
            success:true,
            data:arr
          })
        }
    } catch (error) {
        console.log(error);
    }
  })

  app.get("/upComing",async(req,res)=>{
    // const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    try {
        let data=await axios.get(upcomingMoviesEndpoint)
        // let arr= data.results
        let arr=data.data.results
        // console.log(arr);
        if (arr) {
          res.json({
            success:true,
            data:arr
          })
        }
    } catch (error) {
        console.log(error);
    }
  })

  app.get("/topRated",async(req,res)=>{
    // const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    try {
        let data=await axios.get(topRatedMoviesEndpoint)
        // let arr= data.results
        let arr=data.data.results
        // console.log(arr);
        if (arr) {
          res.json({
            success:true,
            data:arr
          })
        }
    } catch (error) {
        console.log(error);
    }
  })

  app.post("/detail",async(req,res)=>{
    let id=req.body.id
    const castEndPoint=`${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
    const similarMovies=`${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
    const detailEndPonit=`${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
    const url = 'https://api.themoviedb.org/3/person/person_id?language=en-US';
    try {
      let castD=await axios.get(castEndPoint)
      let similarMoviesD=await axios.get(similarMovies)
      let detailD=await axios.get(detailEndPonit)

      let arr= similarMoviesD.data.results
      
      // console.log(castD.data.cast);
      if (arr) {
        res.json({
          success:true,
          castData:castD.data.cast,
             simiMovies:similarMoviesD.data.results,
             detail:detailD.data
        })
      }
  } catch (error) {
      console.log(error);
  }
   
  })

  // pDetail

  app.post("/pDetail",async(req,res)=>{
    let id=req.body.id
    const personDetailsEndpoint =  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
    const personMoviesEndpoint = `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;
  
    // const url = 'https://api.themoviedb.org/3/person/person_id?language=en-US';
    try {
      let castD=await axios.get(personDetailsEndpoint)
        let similarMoviesD=await axios.get(personMoviesEndpoint)
     

      let arr= similarMoviesD.data.cast
      
      console.log(castD);
      // console.log(similarMoviesD);

      if (arr) {
        res.json({
          success:true,
          castData:castD.data.cast,
             simiMovies:similarMoviesD.data.cast,
             detail:castD.data
        })
      }
  } catch (error) {
      console.log(error);
  }
   
  })


  app.post("/search",async(req,res)=>{
    let search=req.body.search
    let params={
      
      query: search,
      include_adult: false,
      language: 'en-US',
      page: '1'
    }
    // console.log(params);
  const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
  try {
    let data=await axios.get(searchMoviesEndpoint,{params})
    // let arr= data.results
    let arr=data.data.results
    console.log(data);
    if (arr) {
      res.json({
        success:true,
        data:arr
      })
    }
} catch (error) {
    console.log(error);
}

// const apiCall = async (endpoint, params)=>{
//   const options = {
//       method: 'GET',
//       url: endpoint,
//       params: params? params: {}
//   };

//   try{
//       const response = await axios.request(options);
//       console.log(response.data);
//       return response.data;
//   }catch(error){
//       console.log('error: ',error);
//       return {};
//   }
// }
//  searchMovies = ()=>{
//   return apiCall(searchMoviesEndpoint, params);
// }
// searchMovies()

  })
