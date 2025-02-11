// Variables to store game state
let palabra;
let palabraOculta;
let fallos;
let letrasUsadas;
contenedor = document.getElementById("container");
var email, pwd, rol, pts;

//Cerrar Sesion
function cerrarSesion(){
    palabra = "";
    palabraOculta = "";
    fallos = 0;
    letrasUsadas = [];
    email = "";
    pwd = "";
    rol = "";
    pts = 0;
    logIn();
    $("#container-select-pantallas").css("display", "none");
}

// Function to handle a letter attempt
function intento() {
    const input = document.getElementById("letra");
    if (!validarLetra(input)) { // Validate the input letter
        input.value = "";
        return;
    }
    const letra = input.value.toUpperCase();
    input.value = "";

    if (letrasUsadas.includes(letra)) { // Check if the letter has already been used
        return;
    }

    procesarLetra(letra); // Process the letter
    updateSiHePerdido(); // Check if the player has lost
    updateSiHeGanado(); // Check if the player has won
}

// Function to process the input letter
function procesarLetra(letra) {
    let letraEncontrada = false;
    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) { // Reveal the letter if it is in the word
            palabraOculta[i] = letra;
            letraEncontrada = true;
        }
    }

    document.getElementById("palabra").innerText = palabraOculta.join(" ");

    if (!letraEncontrada) { // If the letter is not found, increment the failure count
        updatePuntos(-1); // Deduct points for each failed attempt
        fallos++;
        document.getElementById("imagen_ahorcado").setAttribute("src", './img/' + fallos + '.png');
        letrasUsadas.push(letra);
        document.getElementById("letras-usadas").innerText = letrasUsadas.join(", ");
    }else{
        updatePuntos(2); // Add points for each successful attempt
    }
}

// Function to check if the player has won
function updateSiHeGanado(){
    if (!palabraOculta.includes("_")) { // If there are no hidden letters left
        updatePuntos(10); // Add points for winning
        guardarPartida(email, palabra, pts); // Save game data
        contenedor.innerHTML = `
        <h1 id="titulo">YOU WIN</h1>
        <textarea id="palabra" readonly></textarea><br>
        `;
        document.getElementById("palabra").innerText = palabra;
        //setTimeout(seleccionarPalabra, 5000); // Select a new word after 5 seconds
    }
}

// Function to check if the player has lost
function updateSiHePerdido(){
    if (fallos === 6) { // If the failure count reaches 6
        updatePuntos(-5); // Deduct points for losing
        guardarPartida(email, palabra, pts); // Save game data
        contenedor.innerHTML = `
        <h1 id="titulo">YOU LOSE</h1>
        <textarea id="palabra" readonly></textarea><br>
        `;
        document.getElementById("palabra").innerText = palabra;
        //setTimeout(seleccionarPalabra, 5000); // Select a new word after 5 seconds
    }
}

// Function to validate the input letter
function validarLetra(input) {
    const regex = /^[a-zA-Z]$/;
    return regex.test(input.value);
}

// Function to display the login form
function logIn(){
    contenedor.innerHTML = `
    <label for="email">Introduzca el e-Mail</label><br>
    <input type="text" name="email" id="email"><br>
    <label for="pwd">Introduzca la Contraseña</label><br>
    <input type="password" name="pwd" id="pwd"><br>
    <button onclick="logear()" id="log-in">Enviar</button>
    `;
}

function misAjustes() {
    contenedor.setAttribute("style", "width: 400px;");
    contenedor.innerHTML = `
        <h1>Ajustes y Estadísticas</h1>
        <h2>Ajustes</h2>
        <label for="pwd" id="pwd_change_new">Nueva Contraseña:</label><br>
        <input type="password" name="pwd" id="pwd_change"><br>
        <button onclick="cambiarContrasena()">Cambiar Contraseña</button>

        <h2>Historial de Partidas</h2>
        <table id="tabla-partidas" border="1">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Palabra</th>
                    <th>Puntuación</th>
                </tr>
            </thead>
            <tbody>
            
            </tbody>
        </table>
    `;

    // Fetch and display game history from the database
    $.ajax({
        url: './php/getHistorialPartidas.php',
        type: 'GET',
        dataType: 'json',
        data: { email: email },
        success: function(respuesta) {
            if (respuesta.status === "success") {
                const tbody = document.querySelector("#tabla-partidas tbody");
                respuesta.partidas.forEach(function(partida) {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${partida.fecha}</td>
                        <td>${partida.palabra}</td>
                        <td>${partida.puntuacion_final}</td>
                    `;
                    tbody.appendChild(row);
                });
            } else {
                console.error(respuesta.message);
            }
        },
        error: function(_jqXHR, textStatus, errorThrown) {
            console.error("Error: " + textStatus, errorThrown);
        }
    });
}

function cambiarContrasena() {
    const nuevaPwd = $('#pwd_change').val();
    if (nuevaPwd.trim() === "") {
        $('#pwd_change_new').text("La nueva contraseña no puede estar vacía:");
        return;
    }

    $.ajax({
        url: './php/cambiarContrasena.php',
        type: 'POST',
        data: { email: email, pwd: pwd, nuevaPwd: nuevaPwd },
        success: function(respuesta) {
            if (respuesta.status === "success") {
                console.log("Contraseña cambiada correctamente");
                alert("Contraseña cambiada correctamente");
                misAjustes(); // Refrescar la tabla
            } else {
                console.error(respuesta.message);
            }
        },
        error: function(_jqXHR, textStatus, errorThrown) {
            console.error("Error: " + textStatus, errorThrown);
        }
    });
}

// Function to display the word selection screen
function seleccionarPalabra(){
    if(rol === 'admin'){
        $("#container-select-pantallas").css("display", "block");
        $("#container-select-pantallas").html(`
            <button onclick="seleccionarPalabra()">Juego</button>
            <button onclick="mostrarAdminPanel()">Admin</button>
            <button onclick="misAjustes()">Ajustes y Estadísticas</button>
            <button onclick="cerrarSesion()">Cerrar Sesión</button>
        `);
    }else{
        $("#container-select-pantallas").css("display", "block");
        $("#container-select-pantallas").html(`
            <button onclick="seleccionarPalabra()">Juego</button>
            <button onclick="misAjustes()">Ajustes y Estadísticas</button>
            <button onclick="cerrarSesion()">Cerrar Sesión</button>
        `);
    }

    if(rol === 'admin' || rol === 'player'){
        contenedor.setAttribute("style", "width: 334px;");
        contenedor.innerHTML = `
        <h1 id="titulo">ELEGIR PALABRA</h1>
        <select id="select-words">
            <option value="" hidden>Seleccione Categoría</option>
        </select><br>
        <button onclick="comenzarJuego()">EMPEZAR JUEGO</button>
        `;
    
        // Fetch categories from the database
        $.ajax({
            url: './php/getCategorias.php',
            type: 'GET',
            dataType: 'json', // Expect JSON response
            success: function(respuesta) {
                if (respuesta.status === "success") {
                    const select = document.getElementById("select-words");
                    respuesta.categorias.forEach(function(categoria) {
                        const option = document.createElement("option");
                        option.value = String(categoria.categoria);
                        option.text = String(categoria.categoria);
                        select.add(option);
                    });
                } else {
                    console.error(respuesta.message);
                }
            },
            error: function(_jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus, errorThrown);
            }
        });
    }else{
        console.log("Debes iniciar sesión");
    }
}

// Function to load the game screen
function cargarJuego(){
    contenedor.innerHTML = `
    <h1 id="titulo">AHORCADO</h1>
    <h3 id="puntos"></h3>
    <img id="imagen_ahorcado" src=""><br>
    <textarea id="palabra" readonly></textarea><br>
    <textarea id="letras-usadas" placeholder="Letras Falladas" readonly></textarea>
    <div id="form">
        <input type="text" id="letra" maxlength="1">
        <button onclick="intento()">Probar</button>
        <button id="boton-ayuda" onclick="ayuda(-2)">Ayuda</button>
    </div>
    `;
}

function mostrarAdminPanel() {
    contenedor.innerHTML = `
        <h1>Información de Usuarios</h1>
        <table id="tabla-usuarios" border="1">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Puntuación</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        <br><br>
        <h1>Administrar Categorías y Palabras</h1>
        <label for="categoria" id="new_categoria_label">Nueva Categoría:</label><br>
        <input type="text" name="categoria" id="new_categoria"><br>
        <label for="palabra" id="new_palabra_label">Nueva Palabra:</label><br>
        <input type="text" name="palabra" id="new_palabra"><br>
        <button onclick="crearCategoria()">Crear Nueva Categoría</button>
        <table id="tabla-categorias" border="1">
            <thead>
                <tr>
                    <th>Categoría</th>
                    <th>Palabra</th>
                    <th>Acciones</th>
                    <th>Opciones Categoría</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    `;
    contenedor.setAttribute("style", "width: 1000px;");
    
    // Fetch and display categories and words from the database
    $.ajax({
        url: './php/getCategoriasYPalabras.php',
        type: 'GET',
        dataType: 'json',
        success: function(respuesta) {
            if (respuesta.status === "success") {
                const tbody = document.querySelector("#tabla-categorias tbody");
                for (const categoria in respuesta.categorias) {
                    const palabras = respuesta.categorias[categoria];
                    const rowSpan = palabras.length;
                    palabras.forEach(function(palabra, index) {
                        const row = document.createElement("tr");
                        if (index === 0) {
                            row.innerHTML = `
                                <td rowspan="${rowSpan}">${categoria}</td>
                                <td>${palabra}</td>
                                <td>
                                    <button onclick="eliminarPalabra('${palabra}')">Eliminar Palabra</button>
                                </td>
                                <td rowspan="${rowSpan}">
                                    <label for="new_palabra_for_${categoria}_label" id="new_palabra_for_categoria_label">Nueva Palabra:</label><br>
                                    <input type="text" id="new_palabra_for_${categoria}" placeholder="Nueva Palabra">
                                    <button onclick="crearPalabra('${categoria}')">Crear Nueva Palabra</button>
                                    <button onclick="eliminarCategoria('${categoria}')">Eliminar Categoría</button><br>
                                </td>
                            `;
                        } else {
                            row.innerHTML = `
                                <td>${palabra}</td>
                                <td>
                                    <button onclick="eliminarPalabra('${palabra}')">Eliminar Palabra</button>
                                </td>
                            `;
                        }
                        tbody.appendChild(row);
                    });
                }
            } else {
                console.error(respuesta.message);
            }
        },
        error: function(_jqXHR, textStatus, errorThrown) {
            console.error("Error: " + textStatus, errorThrown);
        }
    });

    // Fetch and display user information from the database
    $.ajax({
        url: './php/getUsuarios.php',
        type: 'GET',
        dataType: 'json',
        success: function(respuesta) {
            if (respuesta.status === "success") {
                const tbody = document.querySelector("#tabla-usuarios tbody");
                respuesta.usuarios.forEach(function(usuario) {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${usuario.email}</td>
                        <td>${usuario.rol}</td>
                        <td>${usuario.puntuacion}</td>
                    `;
                    tbody.appendChild(row);
                });
                // Initialize DataTable after the table is populated
                $('#tabla-usuarios').DataTable();
            } else {
                console.error(respuesta.message);
            }
        },
        error: function(_jqXHR, textStatus, errorThrown) {
            console.error("Error: " + textStatus, errorThrown);
        }
    });
}

function buscarUsuarios(){
    let table = new DataTable('#tabla-usuarios');
}

function crearCategoria() {
    let nuevaCategoria = $('#new_categoria').val();
    let nuevaPalabra = $('#new_palabra').val();
    if (nuevaCategoria.trim() === "") {
        nuevaCategoria = $('#new_categoria_label').text("El nombre de la categoría no puede estar vacío:");
        return;
    }
    if (nuevaPalabra.trim() === "") {
        nuevaPalabra = $('#new_palabra_label').text("El nombre de la palabra no puede estar vacío:");
        return;
    }
    if (nuevaCategoria && nuevaPalabra) {
        
        if (nuevaPalabra) {
            $.ajax({
                url: './php/crearCategoria.php',
                type: 'POST',
                data: { categoria: nuevaCategoria.trim(), palabra: nuevaPalabra.trim() },
                success: function(respuesta) {
                    console.log(respuesta.status);
                    if (respuesta.status === "success") {
                        console.log("Categoría y palabra creadas correctamente");
                        mostrarAdminPanel(); // Refrescar la tabla
                    } else {
                        console.error(respuesta.message);
                    }
                },
                error: function(_jqXHR, textStatus, errorThrown) {
                    console.error("Error: " + textStatus, errorThrown);
                }
            });
        }
    }
}

function crearPalabra(categoria) {
    let nuevaPalabra = $(`#new_palabra_for_${categoria}`).val();
    console.log(nuevaPalabra);
    if (nuevaPalabra.trim() === "") {
        $(`#new_palabra_for_${categoria}_label`).text("El nombre de la palabra no puede estar vacío:");
        return;
    }

    if (nuevaPalabra) {
        $.ajax({
            url: './php/crearPalabra.php',
            type: 'POST',
            data: { categoria: categoria.trim(), palabra: nuevaPalabra.trim() },
            success: function(respuesta) {
                if (respuesta.status === "success") {
                    mostrarAdminPanel(); // Refrescar la tabla
                } else {
                    console.error(respuesta.message);
                    if(respuesta.message === "La palabra ya existe en esta categoría"){
                        alert("La palabra ya existe en esta categoría");
                    }
                }
            },
            error: function(_jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus, errorThrown);
            }
        });
    }
}

function eliminarCategoria(categoria) {
    // Implementar lógica para eliminar una categoría de la base de datos
    $.ajax({
        url: './php/eliminarCategoria.php',
        type: 'POST',
        data: { categoria: categoria },
        success: function(respuesta) {
            if (respuesta.status === "success") {
                mostrarAdminPanel(); // Refrescar la tabla
            } else {
                console.error(respuesta.message);
            }
        },
        error: function(_jqXHR, textStatus, errorThrown) {
            console.error("Error: " + textStatus, errorThrown);
        }
    });
}

function eliminarPalabra(palabra) {
    // Implementar lógica para eliminar una palabra de la base de datos
    $.ajax({
        url: './php/eliminarPalabra.php',
        type: 'POST',
        data: { palabra: palabra },
        success: function(respuesta) {
            if (respuesta.status === "success") {
                mostrarAdminPanel(); // Refrescar la tabla
            } else {
                console.error(respuesta.message);
            }
        },
        error: function(_jqXHR, textStatus, errorThrown) {
            console.error("Error: " + textStatus, errorThrown);
        }
    });
}

// Function to start the game
function comenzarJuego(){
    let selectCategoria = document.getElementById("select-words").value;
    console.log("Categoría Seleccionada: " + selectCategoria);
    cargarJuego();
    $('#puntos').text("Puntos: " + pts);

    // Fetch a word from the database based on the selected category
    $.ajax({
        url: './php/getPalabra.php',
        type: 'POST',
        data: {
            'categoria': selectCategoria
        },
        dataType: 'json', // Expect JSON response
        success: function(respuesta) {
            if (respuesta.status === "success") {
                palabra = respuesta.palabra;
                console.log("Palabra: " + palabra);
                palabraOculta = Array(palabra.length).fill("_");
                fallos = 0;
                letrasUsadas = [];
                document.getElementById("palabra").innerText = palabraOculta.join(" ");
                document.getElementById("imagen_ahorcado").setAttribute("src", './img/' + fallos + '.png');
            } else {
                console.error(respuesta.message);
            }
        },
        error: function(_jqXHR, textStatus, errorThrown) {
            console.error("Error: " + textStatus, errorThrown);
        }
    });
}

// jQuery document ready function

// Event handler for login button click
function logear() {
    email = $('#email').val();
    pwd = $('#pwd').val();
    console.log(`Email: ${email}, Contraseña: ${pwd}`);

    if (email == ""){
        console.log("Campos Vacíos");
        $('#email').css("background-color", "lightcoral");
        if (pwd == "") {
            console.log("Campos Vacíos");
            $('#pwd').css("background-color", "lightcoral");
        }
    }else if (pwd == "") {
        console.log("Campos Vacíos");
        $('#pwd').css("background-color", "lightcoral");
    }
    else {
        $('#email').css("background-color", "#f5f5dc");
        $('#pwd').css("background-color", "#f5f5dc");
        $.ajax({
            url: './php/logIn.php',
            type: 'POST',
            data: {
                'email': email,
                'pwd': pwd
            },
            dataType: 'json', // Expect JSON response
            success: function(respuesta) {
                if (respuesta.status === "success") {
                    pts = parseInt(respuesta.puntuacion);
                    rol = respuesta.rol;
                    console.log(`LogIn --> Puntos: ${pts}, Rol: ${rol}`);
                    seleccionarPalabra();
                } else {
                    console.log(respuesta.message);
                    $('#email').css("background-color", "lightcoral");
                    $('#pwd').css("background-color", "lightcoral");
                }
            },
            error: function(_jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus, errorThrown);
            }
        });
    }
};

// Function to provide help by revealing a letter
function ayuda(cambioPuntos){
    if(parseInt(pts) + cambioPuntos >= 0) {
        updatePuntos(cambioPuntos);
        revelarLetra();
    } else {
        updatePuntos(cambioPuntos);
    }
}

// Function to update points
function updatePuntos(cambioPuntos){
    console.log("Puntos Antes del Cambio: " + pts);
    if(pts < 10 && (pts + cambioPuntos) <= 0)
        console.error("No Tienes Puntos Suficientes");
    else{
        pts = parseInt(pts) + parseInt(cambioPuntos);
        $.ajax({
            url: './php/updatePuntos.php',
            type: 'POST',
            data: {
                'email': email,
                'puntos': pts
            },
            dataType: 'json', // Expect JSON response
            success: function(respuesta) {
                if (respuesta.status === "success") {
                    pts = respuesta.puntos;
                    $('#puntos').text("Puntos: " + pts);
                } else {
                    console.error(respuesta.message);
                }
            },
            error: function(_jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus, errorThrown);
            }
        });
    }
    console.log("Puntos Después del Cambio: " + pts);
}

// Function to generate a random uppercase letter
function randomUpperChar() {
    let codigoAscii = Math.floor(Math.random() * 26) + 65;
    return letra = String.fromCharCode(codigoAscii);
}

// Function to reveal a letter in the word
function revelarLetra(){
    let salir = false;
    do{
        let letra = randomUpperChar();
        if(!palabraOculta.includes(letra) && palabra.includes(letra)){
            for (let i = 0; i < palabra.length; i++) {
                if (palabra[i] === letra) {
                    palabraOculta[i] = letra;
                }
            }salir = true;
        }
    }while(!salir);
    $('#palabra').text(palabraOculta.join(" "));
    updateSiHeGanado();
}

// Function to save the game data
function guardarPartida(email, palabra, puntuacion_final) {
    $.ajax({
        url: './php/guardarPartida.php',
        type: 'POST',
        data: {
            'email': email,
            'palabra': palabra,
            'puntuacion_final': puntuacion_final
        },
        dataType: 'json',
        success: function(respuesta) {
            if (respuesta.status === "success") {
                console.log("Partida Guardada");
            }else{
                console.log(respuesta.message);
            }
        },
        error: function(_jqXHR, textStatus, errorThrown) {
            console.error("Error: " + textStatus, errorThrown);
        }
    });
}