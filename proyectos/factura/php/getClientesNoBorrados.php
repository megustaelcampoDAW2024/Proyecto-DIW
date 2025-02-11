<?php
    include_once('./dbConect.php');

    $return = [];
    $clientes = [];

    if (!$conn->connect_error){
        $query = 
        "SELECT *
        FROM cliente
        WHERE borrado = FALSE";
        $resultado = $conn->query($query);
    }

    if($resultado->num_rows > 0){
        while($fila = $resultado->fetch_assoc()){
            $clientes[] = $fila;
        }
        $return['clientes'] = $clientes;
        $return['status'] = 'lleno';
    }else{
        $return['status'] = 'vacio';
    }

    $return = json_encode($return, JSON_PRETTY_PRINT);
    echo $return;

    $conn->close();
?>