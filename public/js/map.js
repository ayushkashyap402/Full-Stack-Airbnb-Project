 mapboxgl.accessToken = mapToken;

const mapDiv = document.getElementById('map');
const coordinates = JSON.parse(mapDiv.dataset.coordinates);

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12', // Use the standard style for the map
        // projection: 'globe', // display the map as a globe
        zoom: 9, // initial zoom level, 0 is the world view, higher values zoom in
        center: coordinates,// center the map on this longitude and latitude
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });



    const marker = new mapboxgl.Marker()
    .setLngLat(coordinates) //Listing.geometry.coordinates
    .addTo(map);