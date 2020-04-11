//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request=require("request");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",function(req,res){
 
  var options = {
    method: 'GET',
    url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php',
    headers: {
      'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
      'x-rapidapi-key': '3c25f59e85mshef136a5a563ca4dp15890djsn46a97c6778af'
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var stats=JSON.parse(body);
    //console.log(body)
    res.render("index.ejs",{
      stats:stats,
    })
  });

})

app.post("/",function(req,res){
  var country=req.body.country;
  

  request("https://pomber.github.io/covid19/timeseries.json",function(error,response,body){
    var data=JSON.parse(body)
    res.render("tracker.ejs",{
      data:data,
      country:country
    })  
  })
})


app.get("/india",function(req,res){

  var options = {
    method: 'GET',
    url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php',
    qs: {country: 'India'},
    headers: {
      'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
      'x-rapidapi-key': '3c25f59e85mshef136a5a563ca4dp15890djsn46a97c6778af'
    }
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    var statsin=JSON.parse(body);
    res.render("india.ejs",{
      statsin:statsin
    })  
  })

});

app.post("/india",function(req,res){
  var state=req.body.state;
  var options = {
    method: 'GET',
    url: 'https://corona-virus-world-and-india-data.p.rapidapi.com/api_india',
    headers: {
      'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com',
      'x-rapidapi-key': '3c25f59e85mshef136a5a563ca4dp15890djsn46a97c6778af'
    }
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    //console.log(body);
    var data=JSON.parse(body);
    res.render("state.ejs",{
      data:data,
      state:state
    })
  
    //console.log(body);
  });
})





  
  
  

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
