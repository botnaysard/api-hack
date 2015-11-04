$(document).ready(function(){

// Capture the users home and current address
	
	$('.location-getter').submit(function(event){
		event.preventDefault();	
		var homeAddress = $(this).find("input[name='home-address']").val();
		var currentLocation = $(this).find("input[name='current-location']").val();
		console.log(homeAddress, currentLocation);

		// Request latitude and longitude for home address from google maps geocoding api	

		var homeUrl ="https://maps.googleapis.com/maps/api/geocode/json?address=" + homeAddress +"&key=AIzaSyDGyza7mSup_IeTPg8YHiasaPBAaUUMKBM"
  		
  		$.getJSON(homeUrl, function(home){ // function(response) -- naming the object that is returned from the API
    		console.log(home);
    		var homeLat = home.results[0].geometry.location.lat;
    		var homeLong = home.results[0].geometry.location.lng;
    		console.log(homeLat, homeLong);
    	});

		// Request latitude and longitude for current location from google maps geocoding api

		var currentUrl ="https://maps.googleapis.com/maps/api/geocode/json?address=" + currentLocation +"&key=AIzaSyDGyza7mSup_IeTPg8YHiasaPBAaUUMKBM"
  		
  		$.getJSON(currentUrl, function(current){ // function(response) -- naming the object that is returned from the API
    		console.log(current);
    		var currentLat = current.results[0].geometry.location.lat;
    		var currentLong = current.results[0].geometry.location.lng;
    		console.log(currentLat, currentLong);    		
    	});

		// Calculate the distance between the two locations using the haversine formula
	});
});