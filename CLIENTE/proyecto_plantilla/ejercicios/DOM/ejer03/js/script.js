"use strict"

const btnSelector = document.getElementById("btnSelector");
const btnSelectorAll = document.getElementById("btnSelectorAll");
const resultado = document.getElementById("resultado");

btnSelector.addEventListener("click", () => {
    const primerParrafo = document.querySelector(".parrafo");
    resultado.innerHTML = `<p>querySelector() encontró <b>${primerParrafo.textContent}</b></p>`;
});

btnSelectorAll.addEventListener("click", () => {
    const parrafos = document.querySelectorAll(".parrafo");
    let salida = "<p>querySelectorAll() encontró: </p><ul>";
    parrafos.forEach((p)=> {
        salida += `<li><b>${p.textContent}</b></li>`;
    });
    salida += "</ul>";
    resultado.innerHTML = salida;
});

