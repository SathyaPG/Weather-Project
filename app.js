const express = require("express");
const https =  require("https");
const bodyParser =  require("body-Parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post("/", function(req, res){
    const city = req.body.cityname;
    const apikey = "5c4c312702b335fd7d4951de86ec0aed";
    const url = "https://api.openweathermap.org/data/2.5/weather?q= " + city + "&appid=" + apikey + "&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            console.log(temp);
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The current weather in "+ city + " is  "+ temp + " degrees.</h1>");
            res.write("<img src = " + imageURL + ">");
        });
    });
});

app.listen(3000, function(){
    console.log("server started on 3000 port");
})