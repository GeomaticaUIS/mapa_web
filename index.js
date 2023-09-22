
const mapa = document.getElementById('mapaVisual');
var map = L.map(mapa).setView([7.12728, -73.11920], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

const getData = async() =>{
    var select = document.getElementById("citySelect");

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET','metadato.json',true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState ==4 &&this.status==200){
            //console.log(this.responseText);
            let datosParseados= JSON.parse(this.responseText);
            console.log(datosParseados);
            datosParseados.forEach(element => { 
                const myJsonLocal = JSON.stringify(element); 
                localStorage.setItem(element.CODIGO,myJsonLocal);

                var option = document.createElement("option");
                option.value = element.CODIGO; // Valor de la opción
                option.text = element.NOMBRE_PROYECTO; // Texto visible de la opción
                select.appendChild(option);
                console.log(option.value)

                var marker = L.marker([element.Latitud, element.Longitud]).addTo(map); 
                var popupContent = '<b>' + element.NOMBRE_PROYECTO + '</b><br>' + 'Fecha captura: ' + element.FECHA_CAPTURA;
                marker.bindPopup(popupContent); 

                marker.on('popupopen', function () {
                    // Actualiza el contenido de la tarjeta con la información del popup
                    document.getElementById("codigo").textContent = element.CODIGO; 
                    document.getElementById("nombre").textContent =element.NOMBRE_PROYECTO;
                    document.getElementById("fecha").textContent = element.FECHA_CAPTURA;
                    document.getElementById("tecnologia").textContent = element.TECNOLOGIA;
                    document.getElementById("latitud").textContent = element.Latitud+"°";
                    document.getElementById("longitud").textContent = element.Longitud+"°";
                    document.getElementById("descripcion").textContent = element.DESCRIPCION;
                    document.getElementById("area").textContent = element.AREA; 
                }); 
            }); 
        }
        
    }
} 
getData(); 
var citySelect = document.getElementById("citySelect");
citySelect.addEventListener("change", function () {
    var selectedCity = citySelect.value; 
    console.log(selectedCity)

});

