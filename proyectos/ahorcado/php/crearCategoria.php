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

// Obtener la nueva categoría y palabra desde la solicitud POST
$categoria = $_POST['categoria'];
$palabra = $_POST['palabra'];

// Verificar si la categoría ya existe
$sql = "SELECT * FROM palabras WHERE categoria = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $categoria);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(array("status" => "error", "message" => "La categoría ya existe"));
} else {
    // Insertar la nueva categoría y palabra
    $sql = "INSERT INTO palabras (palabra, categoria) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $palabra, $categoria);

    if ($stmt->execute()) {
        echo json_encode(array("status" => "success", "message" => "Categoría y palabra creadas correctamente"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Error al crear la categoría y palabra: " . $stmt->error));
    }
}

$stmt->close();
$conn->close();
?>