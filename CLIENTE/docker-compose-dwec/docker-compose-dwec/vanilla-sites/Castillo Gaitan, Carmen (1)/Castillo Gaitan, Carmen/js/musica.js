"use strict"


//Funcion que obtiene y muestra la cita obtenida de la API en el post it
const notaCita = document.getElementById("cita");

async function cargarCita() {
    const cita = await obtenerCita();
    document.getElementById("cita").textContent = cita;
}

cargarCita();


//Funcion que controla el reproductor de musica
let musicaON = false;
const music = document.getElementById('backgroundMusic');

function toggleMusic() {
    if (musicaON) {
        music.pause();
        document.getElementById('musicStatus').textContent = 'play';
        musicaON = false;
    } else {
        music.play();
        document.getElementById('musicStatus').textContent = 'pause';
        musicaON = true;
    }
}


//Para mostrar la fecha
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    const dateStr = today.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('currentDate').textContent = dateStr;
});


//para abrir en una pestaña nueva
function openURL(url) {
    window.open(url, "_blank");
}

//Para redirigir dentro de la web
function redirigir(file) {
    window.location.href = file;
}
