var mymap = L.map('mapid').setView([51.505, -0.09], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 16
}).addTo(mymap);