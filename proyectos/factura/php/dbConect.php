<?php

    $servername = "localhost";
    $username = "u139908756_vue_1_user";
    $password = "GMZ@p>65]t";
    $dbname = "u139908756_factura";

    $conn = new mysqli($host, $username, $password, $dbname);

    // Comprobar si hay error en la conexión
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

?>