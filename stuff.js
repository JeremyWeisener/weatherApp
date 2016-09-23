var response;
//from ip api
var currentLocation;
var longitude;
var latitude;
var city;
var state;
var county;
//from weather api
var weather;
var temp;
var deg;
var inCel;
var inFar;
var inKel;
var choice;
var weatherCode;


// return errors to console

function errorHandling(jqxhr, textStatus, err) {
  console.log("Request Failed: " + textStatus + ", " + err);
}

//stores current location

function CurrentLocation(data) {
    if (data['status'] === 'success') {
        longitude = JSON.stringify(data['lon']);
        latitude = JSON.stringify(data['lat']);
        city = JSON.stringify(data['city']);
        state = JSON.stringify(data['county']);
        currentLocation = data['city'] + ', ' + data['region'];
        console.log(data);
        console.log(longitude);
        console.log(latitude);
        
        
        
        
        
        
      $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + JSON.stringify(data['lat']), {
      //lat:JSON.stringify(data['lat']),
      lon:JSON.stringify(data['lon']),
//      units:'metric',
      APPID:'e66fd596c96a5989978718948ab60bfa'
      },function(){})
      .done(weatherCallBack)
      .fail(errorHandling);
        
        
    }
}


//weather callback function
function weatherCallBack(data){
    console.log(data);
    currentTemp = JSON.stringify(data['main']['temp']);
    weather = JSON.stringify(data['weather'][0]['main']);
    weatherCode = data['weather'][0]['id'];
    console.log(longitude + ", " + latitude);
    console.log(weather);
    console.log(currentTemp);
    
    $('#currentLocation').html(currentLocation);
    $('#currentTemp').html(currentTemp + "° ");
    $("#toggleTemp").html('K');
    $('#weather').html(weather.replace(/["]+/g, ""));
    
    
    
    if(weatherCode<300){
        $('#icon').html("<i class=\"wi wi-day-thunderstorm\"></i>");
    }
    else if(weatherCode<400){
        $('#icon').html("<i class=\"wi wi-day-shower\"></i>");
    }
    else if(weatherCode<600){
        $('#icon').html("<i class=\"wi wi-day-rain\"></i>");
    }
    else if(weatherCode<700){
        $('#icon').html("<i class=\"wi wi-day-snow\"></i>");
    }
    else if(weatherCode==741){
        $('#icon').html("<i class=\"wi wi-day-fog\"></i>");
    }
    else if(weatherCode==800){
        $('#icon').html("<i class=\"wi wi-forecast-io-clear-day\"></i>");
    }
    else if(800<weatherCode<900){
        $('#icon').html("<i class=\"wi wi-day-cloudy\"></i>");
    }
    else if(weatherCode==905){
        $('#icon').html("<i class=\"wi wi-day-windy\"></i>");
    }
    else if(905<weatherCode<1000){
        $('#icon').html("<i class=\"wi wi-hurricane\"></i>");
    }
    
    
    
    
    //$('#icon').html("<i class=\"wi wi-day-" + weather.replace(/["]+/g, "") + "\"></i>");
    
    
    inKel = currentTemp;
    inCel = currentTemp - 273.15;
    inFar = currentTemp * (9/5) - 459.67;
    
    inKel = parseFloat(inKel).toFixed(2);
    inCel = parseFloat(inCel).toFixed(2);
    inFar = parseFloat(inFar).toFixed(2);    
    
}






$(document).ready(function showPosition() {
     
    
    $('#toggleTemp').click(function(){
    
        console.log("something works");
    
    switch($("#toggleTemp").text()){
        case 'K':
            $('#currentTemp').html(inCel + "° ");
            $("#toggleTemp").html('C');
            break;
        
        case 'C':
            $('#currentTemp').html(inFar + "° ");
            $("#toggleTemp").html('F');
            break;
            
        case 'F':
            $('#currentTemp').html(inKel + "° ");
            $("#toggleTemp").html('K');
            break;
    }
    
    
    
});    
    
    
    
    $.getJSON('http://ip-api.com/json/?callback=?',function(data){})
        .done(CurrentLocation)
        .fail(errorHandling);
        
});
