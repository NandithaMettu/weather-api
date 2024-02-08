import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/",(req,res)=>{
  res.render("index.ejs");
})


app.post("/search", async (req, res) => {

  
    try {
      const query=req.body.search;
      let result = await axios.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=e22d061d0576b8c35ba4a13f71114528&units=metric");
    
      let options={weekday:"long",month:"long",day:"numeric"}
    let today= new Date();
    let day= today.toLocaleDateString("en-US",options);
    let time= today.toLocaleTimeString();
      
      
    
      res.render("index.ejs",{ content :{
        name:result.data.name,
        temp:result.data.main.temp,
        country:result.data.sys.country,
        day:day,time:time,
        description:result.data.weather[0].description,
        
        maxtemp:result.data.main.temp_max,
        mintemp:result.data.main.temp_min,
        feel:result.data.main.feels_like,
        humidity:result.data.main.humidity,
        pressure:result.data.main.pressure,
        speed:result.data.wind.speed,
        longitude:result.data.coord.lon,
        latitude:result.data.coord.lat,
        sunrise:result.data.sys.sunrise,
        sunset:result.data.sys.sunset,


      }
       
    
      })
    } catch (error) {
      console.log("error");
      res.status(500);
    }
  });



  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
