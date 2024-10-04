const issLocationApi = 'https://api.wheretheiss.at/v1/satellites/25544';
const mapboxAccessToken = 'pk.eyJ1IjoicGFyaXNyaSIsImEiOiJja2ppNXpmaHUxNmIwMnpsbzd5YzczM2Q1In0.8VJaqwqZ_zh8qyeAuqWQgw'; // Actual Mapbox access token

// Initialize Mapbox
mapboxgl.accessToken = mapboxAccessToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [0, 0],
    zoom: 1
});

const marker = new mapboxgl.Marker().setLngLat([0, 0]).addTo(map);

async function fetchISSData() {
    const response = await fetch(issLocationApi);
    const data = await response.json();

    const longitude = data.longitude.toFixed(2);
    const latitude = data.latitude.toFixed(2);
    const speed = data.velocity.toFixed(2);
    const altitude = data.altitude.toFixed(2);

    updateUI(longitude, latitude, speed, altitude);
    updateMap(longitude, latitude);
}

function updateUI(longitude, latitude, speed, altitude) {
    document.getElementById('iss_location').innerText = `Location: Lat: ${latitude}, Lng: ${longitude}`;
    document.getElementById('speed').innerText = `Speed: ${speed} km/hr`;
    document.getElementById('altitude').innerText = `Altitude: ${altitude} km`;
    document.getElementById('latitude').innerText = `Latitude: ${latitude}`;
    document.getElementById('longitude').innerText = `Longitude: ${longitude}`;

    const now = new Date();
    document.getElementById('utcTime').innerText = `UTC Time: ${now.toUTCString()}`;
    document.getElementById('localTime').innerText = `Local Time: ${now.toLocaleString()}`;
}

function updateMap(longitude, latitude) {
    marker.setLngLat([longitude, latitude]);
    map.flyTo({
        center: [longitude, latitude],
        zoom: 5
    });
}
// To enable central iss
let centerISS = true; 
document.getElementById('iss_center').addEventListener('change', function (e) {
    centerISS = e.target.checked;
});

function updateMap(longitude, latitude) {
    marker.setLngLat([longitude, latitude]);

    if (centerISS) {
        map.flyTo({
            center: [longitude, latitude],
            zoom: 5
        });
    }
}


// Fetch ISS data every second
setInterval(fetchISSData, 1000);
