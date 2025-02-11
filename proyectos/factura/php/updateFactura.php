<?php
include_once('./dbConect.php');

$return = [];
$factura = json_decode($_POST['factura']);
$cliente_id = $factura->cliente->cliente_id;
$fecha = date('Y-m-d', strtotime($factura->fecha));

if (!$conn->connect_error) {
    // Iniciar transacción
    $conn->begin_transaction();

    try {
        // Eliminar los items existentes
        $query = "DELETE FROM item WHERE factura_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $factura->old_factura_id);
        $stmt->execute();

        // Actualizar la factura
        $query = "UPDATE factura SET factura_id = ?, cliente_id = ?, fecha = ? WHERE factura_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("iisi", $factura->factura_id, $cliente_id, $fecha, $factura->old_factura_id);
        $stmt->execute();

        // Insertar los nuevos items
        $query = "INSERT INTO item (factura_id, articulo_id, cantidad, precio) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($query);

        foreach ($factura->items as $item) {
            $stmt->bind_param("iiid", $factura->factura_id, $item->articulo_id, $item->cantidad, $item->precio);
            $stmt->execute();
        }

        // Confirmar transacción
        $conn->commit();
        $return['status'] = "success";
    } catch (Exception $e) {
        // Revertir transacción en caso de error
        $conn->rollback();
        $return['status'] = "error";
        $return['msg'] = "Error al actualizar la factura: " . $e->getMessage();
    }

    $stmt->close();
} else {
    $return['status'] = "error";
    $return['msg'] = "Conexión fallida: " . $conn->connect_error;
}

$return = json_encode($return, JSON_PRETTY_PRINT);
echo $return;

$conn->close();
?>