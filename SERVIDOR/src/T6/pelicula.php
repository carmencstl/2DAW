<?php

class Pelicula {
    

    public function __construct(
                                private readonly string $id,
                                public private(set) string $titulo,
                                public private(set) string $director,
                                public readonly string $estreno, 
                                public private(set) int $stock = 0
    ) {}


    public function vender($unidades): int | false
    {
        if($unidades < 0){
            $unidades = 1;
        }

         return ($this->stock >= $unidades) 
        ? ($this->stock -= $unidades) 
        : false;

    }

    
    public function reponer($unidades): int
    {
        if($unidades < 0) {$unidades = 1;}
        
        return $this->stock += $unidades;
    }

    public function renombrar($nombre): void
    {
        if($nombre != null){
            $this->titulo = $nombre;
        }
    }

    public function infoCorta(): string
    {
        $res = "";
        $res .= "Título: " . $this->titulo . "<br>";
        $res .= " Director: " . $this->director . "<br>";
        $res .= " Estreno: " . $this->estreno . "<br>";    
        $res .= " Stock: " . $this->stock . "<br>";     
        
        return $res;
    }






}