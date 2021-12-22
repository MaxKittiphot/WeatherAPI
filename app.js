require("dotenv").config();

const express = require("express");
// https: native module
// enable to send request to external server Ex. API Server
const https = require("https");
// body-parser enable to parse request's body into obj
const bodyParser = require("body-parser");




// create application
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>{
  res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
  const cityName = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?"+"appid="+process.env.APP_ID+"&units=metric&q="+cityName;
  res.setHeader('Content-type','text/html')
  https.get(url,response=>{
    response.on("data", data=>{
      // data is encoded with hexadecimal character
      // data is decoded to JSON format JSON can JSON.stringify(jSonObject);
      const weatherData = JSON.parse(data);
      const imgID = weatherData.weather[0].icon+"";
      const imgURL =  "http://openweathermap.org/img/wn/"+imgID+"@2x.png"
      res.write("<img src=\""+imgURL+"\">");
      res.write("<h1>"+cityName+"'s temperature is "+weatherData.main.temp+" celcius.</h1>");
      res.send();
    })
  })
})


// make app listen to port 3000 locally
app.listen(3000, ()=>{
  console.log("Server is runnig on port 3000.");
});
