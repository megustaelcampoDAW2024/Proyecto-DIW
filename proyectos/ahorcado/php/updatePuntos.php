<?php
$servername = "localhost";
$username = "u139908756_js_1_user";
$password = "GMZ@p>65]t";
$dbname = "u139908756_ahorcado";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$email = $_POST["email"];
$pts = $_POST["puntos"];

$query = "UPDATE usuarios SET puntuacion = $pts WHERE email = '$email'";
$response = array();
if ($conn->query($query) === TRUE) {
    $response['status'] = 'success';
    $response['puntos'] = $pts;
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to update points';
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>