const tbody = document.querySelector('.table tbody');
const mymap = L.map('mapid').setView([53.435022, 14.569659], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 16,
}).addTo(mymap);
const markerList = [];
let i = 0;

const addTableRow = (markerList) => {
  const tr = document.createElement('tr');
  tbody.appendChild(tr);
  const thIndex = document.createElement('th');
  const tdLat = document.createElement('td');
  const tdLng = document.createElement('td');
  tr.appendChild(thIndex);
  tr.appendChild(tdLat).textContent = `${markerList[i].getLatLng().lat}`;
  tr.appendChild(tdLng).textContent = `${markerList[i].getLatLng().lng}`;
  thIndex.textContent = ++i;
}

const onMapClick = e => {
  const marker = new L.marker(e.latlng, {
    draggable: 'true',
  });
  markerList.push(marker);
  marker.on('dragend', e => {
    const marker = e.target;
    const position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng), {
      draggable: 'true'
    });
    mymap.panTo(new L.LatLng(position.lat, position.lng))

    let index = markerList.indexOf(e.target);
    const tdLatDragend = document.querySelector(`.table tr:nth-of-type(${index + 1}) td:first-of-type`);
    const tdLngDragend = document.querySelector(`.table tr:nth-of-type(${index + 1}) td:last-of-type`)
    tdLatDragend.textContent = `${position.lat}`;
    tdLngDragend.textContent = `${position.lng}`;
  });
  mymap.addLayer(marker);
  addTableRow(markerList);
};
mymap.on('click', onMapClick);