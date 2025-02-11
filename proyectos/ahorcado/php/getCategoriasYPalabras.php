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

// Consulta para obtener categorías y palabras
$sql = "SELECT categoria, palabra FROM palabras";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $categorias = array();
    while($row = $result->fetch_assoc()) {
        $categorias[$row['categoria']][] = $row['palabra'];
    }
    echo json_encode(array("status" => "success", "categorias" => $categorias));
} else {
    echo json_encode(array("status" => "error", "message" => "No se encontraron categorías o palabras"));
}

$conn->close();
?>