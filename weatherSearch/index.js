const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    const cityName = req.body.cityName;
    const apiKey = "20b680f09f1e515a99406a65a5232965";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, function(response) {

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconUrl = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"

            res.write(`
            	<div style="
            		text-align: center;
            		background-color: #d3d3d3;
            		padding: 1rem;
            		margin: 0 auto;
            		width: 70%;
            		">
            		<h1>Weather In ${cityName} Is ${weatherDescription}</h1>
            		<img src="${iconUrl}">
            		<h2>Temperature In ${cityName} Is ${temp} Degree Celcius</h2>
            	</div>
            `);
        })
    })
})


app.listen(5000, function() {
    console.log("Jarvis Is Starting At Port 5000...");
})