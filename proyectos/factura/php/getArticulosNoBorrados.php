<?php
    include_once('./dbConect.php');

    $return = [];
    $articulos = [];

    if (!$conn->connect_error){
        $query = 
        "SELECT *
        FROM articulo
        WHERE borrado = FALSE";
        $resultado = $conn->query($query);
    }

    if($resultado->num_rows > 0){
        while($fila = $resultado->fetch_assoc()){
            $articulos[] = $fila;
        }
        $return['articulos'] = $articulos;
        $return['status'] = 'lleno';
    }else{
        $return['status'] = 'vacio';
    }

    $return = json_encode($return, JSON_PRETTY_PRINT);
    echo $return;

    $conn->close();
?>