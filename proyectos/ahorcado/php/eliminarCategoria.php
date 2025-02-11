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

// Obtener la categoría a eliminar
$categoria = $_POST['categoria'];

// Consulta para eliminar las palabras de la categoría
$sql = "DELETE FROM palabras WHERE categoria = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $categoria);

if ($stmt->execute()) {
    echo json_encode(array("status" => "success", "message" => "Categoría y sus palabras eliminadas correctamente"));
} else {
    echo json_encode(array("status" => "error", "message" => "Error al eliminar la categoría: " . $stmt->error));
}

$stmt->close();
$conn->close();
?>