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

// Obtener el email del usuario desde la solicitud GET
$email = $_GET['email'];

// Consulta para obtener el historial de partidas del usuario
$sql = "SELECT fecha, palabra, puntuacion_final FROM partidas WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $partidas = array();
    while($row = $result->fetch_assoc()) {
        $partidas[] = $row;
    }
    echo json_encode(array("status" => "success", "partidas" => $partidas));
} else {
    echo json_encode(array("status" => "error", "message" => "No se encontraron partidas"));
}

$stmt->close();
$conn->close();
?>