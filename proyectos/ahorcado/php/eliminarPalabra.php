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

// Obtener la palabra a eliminar
$palabra = $_POST['palabra'];

// Consulta para eliminar la palabra
$sql = "DELETE FROM palabras WHERE palabra = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $palabra);

if ($stmt->execute()) {
    echo json_encode(array("status" => "success", "message" => "Palabra eliminada correctamente"));
} else {
    echo json_encode(array("status" => "error", "message" => "Error al eliminar la palabra: " . $stmt->error));
}

$stmt->close();
$conn->close();
?>