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

// Obtener la nueva palabra y la categoría desde la solicitud POST
$categoria = $_POST['categoria'];
$palabra = $_POST['palabra'];

// Verificar si la palabra ya existe en la categoría
$sql = "SELECT * FROM palabras WHERE palabra = ? AND categoria = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $palabra, $categoria);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(array("status" => "error", "message" => "La palabra ya existe en esta categoría"));
} else {
    // Insertar la nueva palabra en la categoría
    $sql = "INSERT INTO palabras (palabra, categoria) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $palabra, $categoria);

    if ($stmt->execute()) {
        echo json_encode(array("status" => "success", "message" => "Palabra creada correctamente"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Error al crear la palabra: " . $stmt->error));
    }
}

$stmt->close();
$conn->close();
?>