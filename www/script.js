var map;
function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 8,
    center: {lat: 47.0833, lng: 8.2667}
  });
} 
alert("I am an alert box!");

google.maps.event.addDomListener(window, 'load', initialize);
