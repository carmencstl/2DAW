<?php

/**
 *Comprueba que no haya precios negativos
 * @param $precio
 * @return bool
 */
function comprobarPrecio($precio): bool
{
    return $precio > 0;
}
