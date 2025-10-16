<?php
session_start();

?>

<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Mostrar productoss</title>
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head>
<body>
<main class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card shadow-sm mt-5">
                <div class="card-body">
                    <h5 class="card-title mb-3">Listado de productos</h5>
                    <table class="table table-striped table-hover align-middle">
                        <thead class="table-primary">
                             <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Precio Unitario</th>
                                 <th scope="col">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                                <?php
                                        $_SESSION["productos"] = $_SESSION["productos"] ?? [];
                                        foreach ($_SESSION["productos"] as $producto) {
                                            echo "<tr>";
                                            echo "<td>" . $producto["nombre"] . "</td>";
                                            echo "<td>" . $producto["categoria"] . "</td>";
                                            echo "<td>" . $producto["precio"] . "</td>";
                                            echo "<td>" . $producto["stock"] . "</td>";
                                        }
                                ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-3">
                <a href="index.php">Volver al inicio</a>
            </div>
        </div>
    </div>
</main>
</body>
</html>

