$(document).ready(function(){
  
  // fade the page in quickly
  $('body').css('display', 'none');
  $('body').fadeIn(200);
  
  // load the map right away to prevent empty content ont screen
  var mapCanvas = document.getElementById('map-container');
  var mapOptions = {
    key: AIzaSyBNxLkjOmKzb09oXaTP3U8WV0tVxPNwI1U,
    zoom: 1,
    center: {lat: 30, lng: 34},
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
      
      // calculate distance between points 
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

          // animate the reset button on hover
          $('.reset').hover(
              function() {
                // do this on hover
                $(this).css('cursor','pointer');
                $(this).animate({'color': '#0F2C42'}, 200);
              }, 
              function() {
                // do this on hover out
                $(this).animate({'color': '#639CA7'}, 200);
              }
          );

          // reset everything when clicked
          $('.reset').click(function(){
            // reset form fields
            $('.box').val("");
            // reset feedback box
            $('.distance-feedback').html("Waiting for input...");  
            // clear dropped markers & reset bounds
            homeMarker.setMap(null);
            currentMarker.setMap(null);
            bounds = new google.maps.LatLngBounds(null);     
          });

          // output distance statement
          $('.distance-feedback').html("You're " + distanceBetween + "km away from home!");
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  });
});