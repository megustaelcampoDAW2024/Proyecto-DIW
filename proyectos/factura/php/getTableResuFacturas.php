<?php
    include_once('./dbConect.php');

    if (!$conn->connect_error){
        $query = 
        "SELECT * 
        FROM vista_facturas_resumen
        ORDER BY Codigo_Factura";
        $resultado = $conn->query($query);
    }

    $facturas = [];
    if($resultado->num_rows > 0){
        while($fila = $resultado->fetch_assoc()){
            $facturas[] = $fila;
        }
        $return = json_encode($facturas, JSON_PRETTY_PRINT);
        echo $return;
    }else{
        echo "vacio";
    }

    $conn->close();
?>