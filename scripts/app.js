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
    		homeLat = home.results[0].geometry.location.lat;
    		homeLong = home.results[0].geometry.location.lng;
    		console.log(homeLat, homeLong);
    	});

		// Request latitude and longitude for current location from google maps geocoding api

		var currentUrl ="https://maps.googleapis.com/maps/api/geocode/json?address=" + currentLocation +"&key=AIzaSyDGyza7mSup_IeTPg8YHiasaPBAaUUMKBM"
  		
  		$.getJSON(currentUrl, function(current){ // function(response) -- naming the object that is returned from the API
    		console.log(current);
    		currentLat = current.results[0].geometry.location.lat;
    		currentLong = current.results[0].geometry.location.lng;
    		console.log(currentLat, currentLong);    		
    	});

		// Calculate the distance between the two locations using the haversine formula

    function calculateDistance() {

      Number.prototype.toRad = function() {
        return this * Math.PI / 180;
      }

      var R = 6371; // km 
      var x1 = currentLat - homeLat;
      var dLat = x1.toRad();  
      var x2 = currentLong - homeLong;
      var dLon = x2.toRad();  
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                      Math.cos(homeLat.toRad()) * Math.cos(currentLat.toRad()) * 
                      Math.sin(dLon/2) * Math.sin(dLon/2);  
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; 
      console.log('distance in km:', d);
    }
    
	});
});