"use strict"

async function APIcall() {
    const urlBase = "https://randomuser.me/api/";
    try {
        const data = await APIresponse(urlBase);
        return data;

    } catch (error) {
        console.error(error);
        mensaje.textContent = "Error al obtener los datos de la API";
        return {};
    }
}

async function obtenerCita() {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    return `"${data.slip.advice}" `;
}

