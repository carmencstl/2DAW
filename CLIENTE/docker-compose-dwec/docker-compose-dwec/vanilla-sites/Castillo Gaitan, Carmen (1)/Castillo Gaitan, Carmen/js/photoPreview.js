//Funcion para previsualizar la imagen que carga el usuario en el registro, me gusto cuando lo hicimos en clase para el crud
function previewPhoto() {
    const fileInput = document.getElementById('imagenPerfil'); 
    if (!fileInput || !fileInput.files[0]) return; 

    const file = fileInput.files[0];
    const previewContainer = document.getElementById('photoPreview');
    const previewImage = document.getElementById('previewImage');

    if (!previewContainer || !previewImage) return;

    previewContainer.style.display = "block"; 
    previewImage.src = URL.createObjectURL(file);
}


document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById('imagenPerfil');
    if (fileInput) {
        fileInput.addEventListener('change', previewPhoto);
    }
});
