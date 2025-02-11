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

// Obtener el email y la nueva contraseña desde la solicitud POST
$email = $_POST['email'];
$nuevaPwd = $_POST['nuevaPwd'];

// Consulta para actualizar la contraseña
$sql = "UPDATE usuarios SET pwd = ? WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $nuevaPwd, $email);

if ($stmt->execute()) {
    echo json_encode(array("status" => "success", "message" => "Contraseña cambiada correctamente"));
} else {
    echo json_encode(array("status" => "error", "message" => "Error al cambiar la contraseña: " . $stmt->error));
}

$stmt->close();
$conn->close();
?>