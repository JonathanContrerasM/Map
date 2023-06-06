import os

mapboxgl.accessToken = os.environ['MAPBOX_ACCESS_TOKEN'];

//fetches the current location
navigator.geolocation.getCurrentPosition(successCurrentLocation, errorCurrentLocation, {
  enableHighAccuracy: true,
});

//Setsup the Map center on Current location in case current location was found
function successCurrentLocation(position) {
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude]);
}

//Setsup the Map with HB in center in case current location was not found
function errorCurrentLocation() {
  setupMap([8.539364, 47.378101]);
}

//takes Longitude then latitude
function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 14,
  });

  //Adds zoom and rotate function
  const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');


    //Add navigation possibility
    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving'
      });
      
      map.addControl(directions, 'top-left');
}
