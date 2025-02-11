<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "u139908756_js_1_user";
$password = "GMZ@p>65]t";
$dbname = "u139908756_ahorcado";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

$sql = "SELECT DISTINCT categoria FROM palabras";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $categorias = [];
    while($row = $result->fetch_assoc()) {
        $categorias[] = ['categoria' => $row['categoria']]; // Ensure the correct structure
    }
    echo json_encode(['status' => 'success', 'categorias' => $categorias]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No categories found']);
}

$conn->close();
?>
