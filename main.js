const mymap = L.map('mapid').setView([53.435022, 14.569659], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 16,
}).addTo(mymap);
const markerList = [];

const onMapClick = e => {
  const marker = new L.marker(e.latlng, {
    draggable: 'true'
  });
  markerList.push(marker);
  marker.on('dragend', e => {
    const marker = e.target;
    const position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng), {
      draggable: 'true'
    });
    mymap.panTo(new L.LatLng(position.lat, position.lng))
  });
  mymap.addLayer(marker);
};

mymap.on('click', onMapClick);