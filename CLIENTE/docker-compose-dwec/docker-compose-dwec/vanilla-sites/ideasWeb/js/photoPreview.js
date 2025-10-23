        function previewPhoto(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) {
                    alert('⚠️ La foto es muy pesada. Elige una imagen de menos de 5MB');
                    event.target.value = '';
                    return;
                }

                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('previewImage').src = e.target.result;
                    document.getElementById('photoPreview').classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        }