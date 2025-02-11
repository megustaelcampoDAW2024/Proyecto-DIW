<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$servername = "localhost";
$username = "u139908756_js_1_user";
$password = "GMZ@p>65]t";
$dbname = "u139908756_ahorcado";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("status" => "error", "message" => "Conexión fallida: " . $conn->connect_error)));
}

// Consulta para obtener la información de los usuarios
$sql = "SELECT email, rol, puntuacion FROM usuarios";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $usuarios = array();
    while($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode(array("status" => "success", "usuarios" => $usuarios));
} else {
    echo json_encode(array("status" => "error", "message" => "No se encontraron usuarios"));
}

$conn->close();
?>