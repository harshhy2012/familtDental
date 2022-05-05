/* jshint esversion: 8 */
let map;

function initMap() {
	const myLatLng = { lat: 28.5869, lng: 77.0440 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 15,
    
  });
   new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Family Dental",
  });
}