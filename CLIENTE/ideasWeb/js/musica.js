"use strict" 

const notaCita = document.getElementById("cita");

async function cargarCita() {
    const cita = await obtenerCita();
    document.getElementById("cita").textContent = cita;
}

cargarCita();

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

"use strict";
document.addEventListener("DOMContentLoaded", function() {
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            const today = new Date();
            const dateStr = `${days[today.getDay()]}, ${today.getDate()} de ${months[today.getMonth()]} ${today.getFullYear()}`;
            document.getElementById('currentDate').textContent = dateStr;
});

function openURL(url) {
    window.open(url, "_blank");
}

function redirigir(file) {
    window.location.href = file;
}
