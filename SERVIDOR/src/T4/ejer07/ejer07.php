<?php


function generaArray(int $totalElementos, int $min, int $max): array
{
    $array = [];
    for($i = 0; $i < $totalElementos; $i++){
        $array[$i] = rand($min, $max);
    }
    return $array;
}

$numeros = (generaArray(4, 0, 21));
print_r($numeros);
echo "<br>";
function minimoArray(array $array): int | float
{
    $minimo = PHP_INT_MAX;
    for ($i = 0; $i < count($array); $i++) {
        if ($array[$i] < $minimo) {
            $minimo = $array[$i];
        }
    }
    return $minimo;
}
function maximoArray(array $array): int | float
{
    $maximo = -1;
    for ($i = 0; $i < count($array); $i++) {
        if ($array[$i] > $maximo) {
            $maximo = $array[$i];
        }
    }
    return $maximo;
}

function mediaArray(array $array): int | float
{
    $suma = array_sum($array);
    return $suma / count($array);
}



echo mediaArray($numeros);
