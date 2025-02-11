<?php
    include_once('./dbConect.php');

    $return = [];
    $factura_id = $_POST['factura_id'];

    if (!$conn->connect_error){
        $query = 
        "DELETE FROM item 
        WHERE factura_id = $factura_id
        ";
        $resultadoItem = $conn->query($query);
    }
    if($resultadoItem){
        $query = 
        "DELETE FROM factura 
        WHERE factura_id = $factura_id
        ";
        $resultadoFactura = $conn->query($query);
        if($resultadoFactura){
            $return['status'] = "success";
        }else{
            $return['status'] = "error";
            $return['msg'] = "Error al Borrar la Factura";
        }
    }else{
        $return['status'] = "error";
        $return['msg'] = "Error al Borrar los Items";
    }

    $return = json_encode($return, JSON_PRETTY_PRINT);
    echo $return;
    
    $conn->close();
?>