"use strict";
document.addEventListener("DOMContentLoaded", function() {
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            const today = new Date();
            const dateStr = `${days[today.getDay()]}, ${today.getDate()} de ${months[today.getMonth()]} ${today.getFullYear()}`;
            document.getElementById('currentDate').textContent = dateStr;
});