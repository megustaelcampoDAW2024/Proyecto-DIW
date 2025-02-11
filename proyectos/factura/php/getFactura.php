<?php
    include_once('./dbConect.php');

    $Codigo_Factura = $_POST['Codigo_Factura'];
    $infoFactura;
    $items = [];
    $return = [];

    // GET FACTURA
    if (!$conn->connect_error){
        $query = 
        "SELECT *
        FROM vista_facturas_info_cliente
        WHERE Codigo_Factura = $Codigo_Factura";
        $resultado = $conn->query($query);
    }

    if($resultado->num_rows > 0){
        $return['factura'] = $resultado->fetch_assoc();
        $return['statusFactura'] = 'lleno';
    }else{
        $return['statusFactura'] = 'vacio';
    }

    // GET ITEMS
    if (!$conn->connect_error){
        $query = 
        "SELECT
        i.item_id,
        i.factura_id,
        i.cantidad,
        i.precio AS precio_item, -- Precio en la tabla item
        i.subtotal,
        a.articulo_id,
        a.descripcion,
        a.precio AS precio_articulo, -- Precio en la tabla articulo
        a.borrado
    FROM
        item i
    JOIN
        articulo a ON i.articulo_id = a.articulo_id
        WHERE factura_id = $Codigo_Factura
        ";
        $resultado = $conn->query($query);
    }

    if($resultado->num_rows > 0){
        while($fila = $resultado->fetch_assoc()){
            $items[] = $fila;
        }
        $return['items'] = $items;
        $return['statusItems'] = 'lleno';
    }else{
        $return['statusItems'] = 'vacio';
    }
    $return = json_encode($return, JSON_PRETTY_PRINT);
    echo $return;

    $conn->close();
?>