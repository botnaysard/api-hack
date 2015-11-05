$(document).ready(function(){

  // drop in a default map so the container isn't empty
  var defaultCanvas = document.getElementById('map-container');
  var defaultOptions = {
    zoom: 1,
    center: {lat: 39, lng: 34},
    mapTypeID: google.maps.MapTypeId.HYBRID
  }
  var defaultmap = new google.maps.Map(defaultCanvas, defaultOptions);

  // Capture the users home and current address
	$('.location-getter').submit(function(event){
		event.preventDefault();	
		var homeAddress = $(this).find("input[name='home-address']").val().toUpperCase();
		var currentLocation = $(this).find("input[name='current-location']").val().toUpperCase();
    var geocoder = new google.maps.Geocoder();
		console.log(homeAddress, currentLocation);

		// Request latitude and longitude for home address from google maps geocoding api	
    if (geocoder){
      geocoder.geocode( { 'address': homeAddress}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK){
         // Get home location (latitude + longitude)
         location1 = results[0].geometry.location;         
        } else {
         alert("Geocode was not successful for the following reason: " + status);
        }
        return location1;
      });
      // 
      geocoder.geocode( { 'address': currentLocation}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          // Get current location (latitude + longitude)
          location2 = results[0].geometry.location;
          distanceBetween = Math.round(google.maps.geometry.spherical.computeDistanceBetween(location1, location2) / 1000);
          console.log(distanceBetween);

          // Calculate the center of the map
          mapCenter = new google.maps.LatLng((location1.lat() + location2.lat()) / 2, (location1.lng() + location2.lng()) / 2);
          console.log('map center:'+ mapCenter);
          
          // Set map parameters
          var mapCanvas = document.getElementById('map-container');
          var mapOptions = {
            zoom: 2,
            center: mapCenter,
            mapTypeID: google.maps.MapTypeId.HYBRID
          }

          // Display the map
          var map = new google.maps.Map(mapCanvas, mapOptions);

          // Add markers
          // For home        
          var homeMarker = new google.maps.Marker({
            position: location1,
            map: map,
            Title: 'Home: ' + homeAddress
          });

          // For current location
            var currentMarker = new google.maps.Marker({
              position: location2,
              map: map,
              Title: 'Current Location: ' + currentLocation
          });

          // Tell the user how far they have travelled
          $('#distance-feedback').html("That's " + distanceBetween + "km away from home!");
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  });
});