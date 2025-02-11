<?php
    include_once('./dbConect.php');

    $return = [];
    $factura = json_decode($_POST['factura']);
    $cliente_id = $factura->cliente->cliente_id;
    $fecha = date('Y-m-d', strtotime($factura->fecha));

    if (!$conn->connect_error){
        $query = 
        "INSERT INTO factura (factura_id, cliente_id, fecha)
        VALUES ($factura->factura_id, $cliente_id, '$fecha')";
        $resultadoFactura = $conn->query($query);
    }
    if($resultadoFactura){
        foreach ($factura->items as $item) {
            $query = 
            "INSERT INTO item (factura_id, articulo_id, cantidad, precio) 
            VALUES ($factura->factura_id, $item->articulo_id, $item->cantidad, $item->precio)
            ";
            $resultadoItem = $conn->query($query);
            if($resultadoItem){
                $return['status'] = "success";
            }else{
                $return['status'] = "error";
                $return['msg'] = "Error al Insertar Item";
            }
        }
    }else{
        $return['status'] = "error";
        $return['msg'] = "Error al Factura";
    }

    $return = json_encode($return, JSON_PRETTY_PRINT);
    echo $return;
    
    $conn->close();
?>