<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
<<<<<<< HEAD
    <title>Document</title>
</head>
<body>

</body>
</html>
    



<?php
=======
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <title>Factorial</title>
</head>
<body>

<div class="container m-3">
    <form method="post">
        <label class="form-label">Introduce el numero del que quieras calcular el factorial</label>
        <input type="number" id="numero" name="numero">
        <button class="btn btn-outline-dark mt-4">Calcular</button>
    </form>
</div>

</body>
</html>

<?php

$numero = $_POST["numero"];
$factorial = 1;

for ($i = 2; $i <= $numero; $i++) {
    $factorial *= $i;
}

echo "<p class=\"m-4\">El factorial de {$numero} es {$factorial} </p>"
?>
>>>>>>> master
