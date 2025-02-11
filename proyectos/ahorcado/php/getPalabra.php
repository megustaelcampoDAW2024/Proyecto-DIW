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

$categoria = $_POST['categoria'];

$sql = "SELECT palabra FROM palabras WHERE categoria = '$categoria'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $palabras = [];
    while($row = $result->fetch_assoc()) {
        $palabras[] = $row['palabra'];
    }
    $palabra = strtoupper($palabras[array_rand($palabras)]);
    echo json_encode(['status' => 'success', 'palabra' => $palabra]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No words found for the selected category']);
}

$conn->close();
?>
