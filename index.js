
const mapa = document.getElementById('mapaVisual');
var map = L.map(mapa).setView([7.12728, -73.11920], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

var searchInput = document.getElementById("searchInput");

var allMarkers = []; // Store all markers in an array

const showAllMarkers = () => {
    allMarkers.forEach(function (marker) {
        map.addLayer(marker);
    });
};

searchInput.addEventListener("input", function () {
    var searchTerm = searchInput.value.toLowerCase();

    // Loop through all markers
    allMarkers.forEach(function (marker) {
        var markerPopupText = marker.getPopup().getContent().toLowerCase();

        if (searchTerm === "" || markerPopupText.includes(searchTerm)) {
            map.addLayer(marker); // Show the marker if it matches the search or if the input is empty
        } else {
            map.removeLayer(marker); // Hide the marker if it doesn't match the search
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var clearSearchIcon = document.getElementById("clear-search");
    var searchInput = document.getElementById("searchInput");

    clearSearchIcon.addEventListener("click", function () {
        // Clear the input field
        searchInput.value = "";

        // Show all markers again
        showAllMarkers();
    });
});

const getData = async () => {
    var select = document.getElementById("citySelect");

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "metadato.json", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datosParseados = JSON.parse(this.responseText);
            datosParseados.forEach((element) => {
                const myJsonLocal = JSON.stringify(element);
                localStorage.setItem(element.CODIGO, myJsonLocal);

                var option = document.createElement("option");
                option.value = element.CODIGO;
                option.text = element.NOMBRE_PROYECTO;
                select.appendChild(option);

                var marker = L.marker([element.Latitud, element.Longitud]).addTo(map);
                var popupContent = '<b>' + element.NOMBRE_PROYECTO + '</b><br>' + 'Fecha captura: ' + element.FECHA_CAPTURA;
                marker.bindPopup(popupContent);

                marker.on("popupopen", function () {
                    document.getElementById("codigo").textContent = element.CODIGO;
                    document.getElementById("nombre").textContent = element.NOMBRE_PROYECTO;
                    document.getElementById("fecha").textContent = element.FECHA_CAPTURA;
                    document.getElementById("tecnologia").textContent = element.TECNOLOGIA;
                    document.getElementById("latitud").textContent = element.Latitud + "°";
                    document.getElementById("longitud").textContent = element.Longitud + "°";
                    document.getElementById("descripcion").textContent = element.DESCRIPCION;
                    document.getElementById("area").textContent = element.AREA;
                });

                // Add each marker to the array
                allMarkers.push(marker);
            });
        }
    };
};

getData();

var citySelect = document.getElementById("citySelect");
citySelect.addEventListener("change", function () {
    var selectedCity = citySelect.value; 
    console.log(selectedCity)

});

