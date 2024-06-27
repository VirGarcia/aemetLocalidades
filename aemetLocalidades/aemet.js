let xhr = new XMLHttpRequest();
let listadoAEMET = "";

xhr.open("GET", "https://www.el-tiempo.net/api/json/v2/provincias", true); // Hacemos la petición por GET
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        listadoAEMET = JSON.parse(xhr.responseText);
        cargarSelectProvincias(listadoAEMET["provincias"]);
        cargarTablaLocalidades("01"); // Cargamos las localidades de la provincia 01
    } else {
        console.log("Cargando datos de la AEMET");
    }
}

xhr.send();

// Añadimos el evento onChange para el select
document.getElementById("provincias").onchange = function () {
    let codProvincia = document.getElementById("provincias").value;
    console.log(codProvincia);
    cargarTablaLocalidades(codProvincia); 
}

/**
 * Cargamos el select de provincias 
 * @param {Array} provincias listado de las provincias de la AEMET
 */
function cargarSelectProvincias(provincias) {
    // Cogemos el select 
    listado = document.getElementById("provincias");

    for (i = 0; i < provincias.length; i++) {
        opcion = document.createElement("option");
        opcion.value = provincias[i]["CODPROV"];
        opcion.text = provincias[i]["NOMBRE_PROVINCIA"];
        listado.append(opcion);
    }
}

function cargarTablaLocalidades(codProvincia) {
    let xhr = new XMLHttpRequest();
    let src = "https://www.el-tiempo.net/api/json/v2/provincias/" + codProvincia + "/municipios";
    let listadoLocalidades = "";

    xhr.open("GET", src, true); // Hacemos la petición por GET
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            listadoLocalidades = JSON.parse(xhr.responseText);
            console.log(listadoLocalidades);
            cargarTabla(listadoLocalidades);

        } else {
            console.log("Cargando datos de la AEMET");
        }
    }

    xhr.send();
}

/**
 * Cargamos la cabecera de la tabla
 */
function cargarCabeceraTabla(){
    // Limpiamos la tabla "a lo bestia"
    let tabla = document.getElementById("localidades");
    tabla.innerHTML="";
    // Creamos los datos de la cabecera
    let cabecera = document.createElement("thead");
    let nombre = document.createElement("th");
    nombre.innerText="Nombre";
    let poblacion = document.createElement("th");
    poblacion.innerText="Población";
    let altitud = document.createElement("th");
    altitud.innerText = "Altitud";
    // Añadimos los datos a la cabecera
    cabecera.append(nombre);
    cabecera.append(poblacion);
    cabecera.append(altitud);
    // Añadimos la cabecera a la tabla
    tabla.append(cabecera);
}

/**
 * Cargamos los datos de los municipios de la Provincia
 * @param {Array} municipios 
 */
function cargarTabla(municipios) {
    let titulo = document.getElementById("tituloLocalidades");
    titulo.innerText = "Municipios de " + municipios["provincia"];

    let tabla=document.getElementById("localidades");
    cargarCabeceraTabla();
    let listadoMunicipios=municipios["municipios"];

    for(let i in listadoMunicipios){
        fila = document.createElement("tr");
        nombre = document.createElement("td");
        nombre.innerText = listadoMunicipios[i]["NOMBRE"];
        poblacion = document.createElement("td");
        poblacion.innerText = listadoMunicipios[i]["POBLACION_MUNI"] + " habitantes";
        altitud = document.createElement("td");
        altitud.innerText = listadoMunicipios[i]["ALTITUD"] + " m";
        // Añadimos los datos de la fila
        fila.append(nombre);
        fila.append(poblacion);
        fila.append(altitud);
        // Añadimos la fila
        tabla.append(fila);
    }
}