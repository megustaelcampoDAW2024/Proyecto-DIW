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
$pwd = $_POST["pwd"];

$query = "SELECT * FROM usuarios WHERE email = '$email' AND pwd = '$pwd'";
$resultado = $conn->query($query);

$response = array();
if ($resultado->num_rows > 0) {
    if($fila = $resultado->fetch_assoc()){
        $response["status"] = "success";
        $response["rol"] = $fila["rol"];
        $response["puntuacion"] = $fila["puntuacion"];
    }
} else {
    $response["status"] = "error";
    $response["message"] = "Login: Error";
}

echo json_encode($response);

$conn->close();
?>