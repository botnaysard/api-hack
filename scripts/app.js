$(document).ready(function(){

  // Capture the users home and current address
	
	$('.location-getter').submit(function(event){
		event.preventDefault();	
		var homeAddress = $(this).find("input[name='home-address']").val();
		var currentLocation = $(this).find("input[name='current-location']").val();
    var geocoder = new google.maps.Geocoder();

		console.log(homeAddress, currentLocation);

		// Request latitude and longitude for home address from google maps geocoding api	
    if (geocoder){
      geocoder.geocode( { 'address': homeAddress}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK){
         //location of first address (latitude + longitude)
         location1 = results[0].geometry.location;
        } else {
         alert("Geocode was not successful for the following reason: " + status);
        }
      });

      geocoder.geocode( { 'address': currentLocation}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          //location of second address (latitude + longitude)
          location2 = results[0].geometry.location;
          // calling the showMap() function to create and show the map
          //showMap();
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
          distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(location1, location2) / 1000;
          console.log(distanceBetween);
      });
    }
  });
});


// Calculate the distance between the two locations using the haversine formula.  NOTE: because the earth is an oblate
// spheroid and not a perfect sphere (which this formula assumes), the result produced by the formula is rather inaccurate.  
// It's also more code, so I'll just use the google API call in the final version.  Will include this in one last commit for 
// posterity/learning purposes.
//
//  function toRad(deg) {
//    return deg * Math.PI/180;
//  }
//
//  var R = 6371;
//  var dLat = toRad(location2.lat()-location1.lat());
//  var dLon = toRad(location2.lng()-location1.lng());
//  var dLat1 = toRad(location1.lat());
//  var dLat2 = toRad(location2.lat());
//  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(dLat1) * Math.cos(dLat1) * Math.sin(dLon/2) * Math.sin(dLon/2);
//  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//  var d = R * c;
//  console.log(d);