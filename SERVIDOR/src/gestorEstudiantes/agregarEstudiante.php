<?php
session_start();



?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <title>Agregar Estudiante</title>
</head>
<body class="bg-light">

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h4 class="text-center mb-4">Agregar Estudiante</h4>
                    <form>
                        <div class="mb-3">
                            <label class="form-label">Nombre del alumno</label>
                            <input type="text" class="form-control" name="Nombre" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Introduce mínimo 3 notas del alumno</label>
                            <textarea class="form-control" rows="4" placeholder="Ej: 8, 9.5, 7" required></textarea>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
