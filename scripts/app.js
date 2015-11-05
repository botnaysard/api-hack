$(document).ready(function(){

  // load the map right away to prevent empty content ont screen
  var mapCanvas = document.getElementById('map-container');
  var mapOptions = {
    zoom: 1,
    center: {lat: 39, lng: 34},
    mapTypeID: google.maps.MapTypeId.HYBRID
  }
  var map = new google.maps.Map(mapCanvas, mapOptions);
  var bounds = new google.maps.LatLngBounds();

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

          // Prepare the map to display markers for  both user enetered points         
          bounds.extend(location1);
          bounds.extend(location2);
          map.fitBounds(bounds);
          map.panToBounds(bounds);
          
          // Add markers to the map
          // For home        
          var homeMarker = new google.maps.Marker({
            position: location1,
            map: map,
            animation: google.maps.Animation.DROP,
            Title: 'Home: ' + homeAddress
          });

          // For current location
            var currentMarker = new google.maps.Marker({
              position: location2,
              map: map,
              animation: google.maps.Animation.DROP,
              Title: 'Current Location: ' + currentLocation
          });

          // Tell the user how far they have travelled
          $('#distance-feedback').html("You're " + distanceBetween + "km away from home!");
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  });
});

//still need to add a reset to the form
//homeMarker.setMap(null);
//currentMarker.setMap(null);

