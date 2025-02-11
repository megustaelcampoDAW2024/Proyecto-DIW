<?php

$servername = "localhost";
$username = "u139908756_js_1_user";
$password = "GMZ@p>65]t";
$dbname = "u139908756_ahorcado";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$email = $_POST['email'];
$palabra = $_POST['palabra'];
$puntuacion_final = $_POST['puntuacion_final'];
$fecha = date('Y-m-d');

$sql = "INSERT INTO partidas (email, palabra, fecha, puntuacion_final) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $email, $palabra, $fecha, $puntuacion_final);

$response = array();
if ($stmt->execute()) {
    $response['status'] = 'success';
} else {
    $response['status'] = 'error';
    $response['message'] = "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
$stmt->close();

echo json_encode($response);
?>