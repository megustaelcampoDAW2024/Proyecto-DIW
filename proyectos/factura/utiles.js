// CLASE FACTURA
class Factura {
    constructor(id) {
        this.factura_id = id;
        this.old_factura_id = id;
        this.cliente = null;    // Información del cliente (nombre, NIF, etc.)
        this.fecha = new Date();      // Fecha de la factura (objeto Date)
        this.items = [];        // Array para almacenar los ítems de la factura
        this.subtotal = 0;      // Subtotal de la factura
        this.iva = 0;          // IVA de la factura
        this.total = 0;         // Total de la factura
    }

    agregarItem(articulo_id, descripcion, cantidad, precio) {
        const item = {
            articulo_id: articulo_id,
            descripcion: descripcion,
            cantidad: cantidad,
            precio: precio,
            subtotal: cantidad * precio
        };
        this.items.push(item);
        this.calcularTotales();
    }


    calcularTotales() {
        this.subtotal = (this.items.reduce((acumulador, item) => acumulador + item.subtotal, 0)).toFixed(2);
        this.iva = (this.subtotal * 0.21).toFixed(2);
        this.total = (parseFloat(this.subtotal) + parseFloat(this.iva)).toFixed(2);
    }

    calcIndicePosible(){

    }
    
    // --- Métodos Setters ---
    
    setCliente(cliente_id, nombre, nif, direccion, poblacion, provincia) {
        this.cliente = null;
        this.cliente = {
            cliente_id: cliente_id,
            nombre: nombre,
            nif: nif,
            direccion: direccion,
            poblacion: poblacion,
            provincia: provincia
        };
    }
    
    setFacturaId(id) {
        this.factura_id = id;
    }
    
    setFecha(fecha) {
        if (fecha instanceof Date) {
            this.fecha = fecha;
        } else {
            console.error("Error: La fecha debe ser un objeto Date.");
        }
    }
    
    getFechaFormateada() {
        const dia = this.fecha.getDate().toString().padStart(2, '0');
        const mes = (this.fecha.getMonth() + 1).toString().padStart(2, '0'); // +1 porque enero es 0
        const anio = this.fecha.getFullYear();
        return `${dia}/${mes}/${anio}`;
    }
    
    getFechaFormatoInput() {
        const anio = this.fecha.getFullYear();
        const mes = (this.fecha.getMonth() + 1).toString().padStart(2, '0'); // +1 porque enero es 0
        const dia = this.fecha.getDate().toString().padStart(2, '0');
        return `${anio}-${mes}-${dia}`;
    }
    
    // No se recomienda un setter para items directamente. 
    // Es mejor usar agregarItem, modificarCantidadItem y eliminarItem.
    
    modificarCantidadItem(articulo_id, nuevaCantidad) {
        const item = this.items.find(item => item.articulo_id === articulo_id);
        if (typeof nuevaCantidad !== 'number' || (nuevaCantidad + item.cantidad) <= 0) {
            console.log("Error: La cantidad debe ser un número positivo.");
            return;
        }
        if (item) {
            item.cantidad += nuevaCantidad;
            item.subtotal = item.cantidad * item.precio;
            factura.calcularTotales();
        } else {
            console.error("Error: No se encontró el artículo en la factura.");
        }
    }

    eliminarItem(articulo_id) {
        const index = this.items.findIndex(item => item.articulo_id === articulo_id);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.calcularTotales();
        } else {
            console.error("Error: No se encontró el artículo en la factura.");
        }
    }

    articuloRepetido(codigoArticulo){
        var esRepetido = false;
        this.items.forEach(item => {
            if(item.articulo_id == codigoArticulo){
                esRepetido = true;
            }
        });
        if(esRepetido)
            return true;
        return false;
    }

    eliminarItemPorArticuloId(articulo_id) {
        const index = this.items.findIndex(item => item.articulo_id === articulo_id);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.calcularTotales();
        } else {
            console.error("Error: No se encontró el artículo con ID:", articulo_id);
        }
    }

}

function validarFormatoFecha(cadena) {
    // Expresión regular para el formato YYYY-MM-DD
    const expresionRegular = /^\d{4}-\d{2}-\d{2}$/;

    // Verificar si la cadena coincide con la expresión regular
    if (!expresionRegular.test(cadena)) {
    return false;
    }

    // Descomponer la cadena en año, mes y día
    const [año, mes, dia] = cadena.split('-').map(Number);

    // Verificar si el año, mes y día son válidos
    const fecha = new Date(año, mes - 1, dia); // Meses en Date empiezan en 0

    return (
    fecha.getFullYear() === año &&
    fecha.getMonth() + 1 === mes &&
    fecha.getDate() === dia
    );
}

// INICIO DEL DOCUMENTO
var factura;
var indicesFacturas = [];
var estoyModificando = false;

$(document).ready(function () {
    pantallaNoReceipt();
    updateTablaFacturas();
});

// TABLA FACTURAS
function updateTablaFacturas() {
    $.ajax({
        url: './php/getTableResuFacturas.php',
        type: 'POST',
        dataType: 'json',
        success: function (respuesta) {
            if (respuesta != 'vacio') {
                $('#content-table-resu-facturas').html("");
                respuesta.forEach(factura => {
                    $('#content-table-resu-facturas').append(`
                    <tr>
                        <td>${factura.Codigo_Factura}</td>
                        <td>${factura.Fecha}</td>
                        <td>${factura.Nombre_Cliente}</td>
                        <td>${factura.Total} &euro;</td>
                        <td>
                            <a id="boton-ver-${factura.Codigo_Factura}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                </svg>
                            </a>

                            <a id="boton-modificar-${factura.Codigo_Factura}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </a>

                            <a id="boton-borrar-${factura.Codigo_Factura}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </a>
                        </td>
                    </tr>`);
                    asignarFuncionesBotones(factura.Codigo_Factura)
                });
                $('#content-table-resu-facturas').append(`<tr><td colspan="5"><button id="boton-nueva-factura" class="boton-nueva-factura">CREAR NUEVA FACTURA</button></td></tr>`);
                indicesFacturas = [];
                respuesta.forEach(factura => {
                    indicesFacturas.push(parseInt(factura.Codigo_Factura));
                });
                $('.boton-nueva-factura').on('click', function () {
                    var contador = 1;
                    if (indicesFacturas.length !== 0) {
                        while (indicesFacturas.includes(contador)) {
                            contador++;
                        }
                    }
                    crearNuevaFactura(contador);
                });
            }
        },
        error: function (_jqXHR, textStatus, errorThrown) {
            console.error("Error: " + textStatus, errorThrown);
        }
    });
}

// CAMBIO DE PANTALLAS
function pantallaNoReceipt() {
    $('#contenedor-factura').html(`
        <div id="letras-receipt">
            <div>
                <p>RECE</p>
            </div>
            <div>
                <p>IPT !</p>
            </div>
        </div>
    `)
}

// FUNCIONES FACTURAS

function asignarFuncionesBotones(Codigo_Factura) {
    $(`#boton-ver-${Codigo_Factura}`).on('click', function () {
        verFactura(Codigo_Factura);
    });

    $(`#boton-modificar-${Codigo_Factura}`).on('click', function () {
        modificarFactura(Codigo_Factura);
    });

    $(`#boton-borrar-${Codigo_Factura}`).on('click', function () {
        if(confirm(`¿Desea Eliminar la Factura ${Codigo_Factura}?`)){
            eliminarFactura(Codigo_Factura);
        }
    });
}

 function modificarFactura(Codigo_Factura){
    $.ajax({
        url: "./php/getFactura.php",
        type: "POST",
        data: {
            "Codigo_Factura": parseInt(Codigo_Factura)
        },
        dataType: "json",
        success: function (respuesta) {
            factura = new Factura(respuesta.factura.Codigo_Factura);
            const [dia, mes, anio] = respuesta.factura.Fecha.split("/");
            factura.setFecha(new Date(anio, mes - 1, dia));
            factura.setCliente(respuesta.factura.ID_Cliente, respuesta.factura.Nombre_Cliente, respuesta.factura.NIF_Cliente, respuesta.factura.Direccion_Cliente, respuesta.factura.Poblacion_Cliente, respuesta.factura.Provincia_Cliente);
            respuesta.items.forEach(item => {
                factura.agregarItem(item.articulo_id, item.descripcion, parseInt(item.cantidad), parseFloat(item.precio_item));
            });
            estoyModificando = true;
            updateVistaNuevaFactura();
            asignarBotonesNuevaFactura();
        },
        error: function (_jqXHR, textStatus, errorThrown) {
            console.log("Error Get Factura");
        }
    });
 }

function eliminarFactura(Codigo_Factura){
    $.ajax({
        type: "POST",
        url: "./php/deleteFactura.php",
        data: { "factura_id" : parseInt(Codigo_Factura) },
        dataType: "json",
        success: function (respuesta) {
            if(respuesta.status != "error"){
                console.log(`Factura ${Codigo_Factura} Borrada`);
                updateTablaFacturas();
                pantallaNoReceipt();
            }
        },
        error: function (_jqXHR, textStatus, errorThrown) {
            console.log("Error Delete Factura");
        }
    });
}

function verFactura(cod) {
    $.ajax({
        url: "./php/getFactura.php",
        type: "POST",
        data: {
            "Codigo_Factura": parseInt(cod)
        },
        dataType: "json",
        success: function (respuesta) {
            if (respuesta.statusFactura != "vacio" && respuesta.statusItems != "vacio") {
                $('#contenedor-factura').html("");
                $('#contenedor-factura').html(`
                    <div id="contenedor-factura-ver">
                        <div id="titulo-factura">
                            <label>FACTURA No${respuesta.factura.Codigo_Factura}</label>
                        </div>
                        <hr>
                        <div>
                            <div>
                                <div>
                                    <span>DATOS FACTURA</span>
                                    <p>FACTURA No: ${respuesta.factura.Codigo_Factura}</p>
                                    <p>FECHA: ${respuesta.factura.Fecha}</p>
                                    <p>NOMBRE CLIENTE: ${respuesta.factura.Nombre_Cliente}</p>
                                    <p>NIF: ${respuesta.factura.NIF_Cliente}</p>
                                    <p>DIRECCIÓN: ${respuesta.factura.Direccion_Cliente}, ${respuesta.factura.Poblacion_Cliente} (${respuesta.factura.Provincia_Cliente})</p>
                                </div>
                                <hr>
                                <div id="lineas-factura">
                                    <span>LINEAS DE LA FACTURA</span>
                                </div>
                                <hr>
                                <div>
                                    <span>RESUMEN IMPORTE</span>
                                    <div>
                                        <p>Subtotal: ${respuesta.factura.Subtotal} &euro;</p>
                                        <p>iva: ${respuesta.factura.IVA} &euro;</p>
                                        <p>Total: ${respuesta.factura.Total} &euro;</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                let contador = 1;
                respuesta.items.forEach(item => {
                    $('#lineas-factura').append(`
                        <p>${contador}. Descripción: ${item.descripcion}</p>
                        <p>&emsp; Cantidad: ${item.cantidad}</p>
                        <p>&emsp; Precio Unitario: ${item.precio_item}</p>
                        <p>&emsp; Importe: ${item.subtotal}</p>
                    `);
                    contador++;
                })
            }
        },
        error: function (_jqXHR, textStatus, errorThrown) {
            console.log("Error Get Factura");
        }
    });
}

function crearNuevaFactura(codigoNuevaFactura) {
    factura = new Factura(codigoNuevaFactura);
    estoyModificando = false;
    updateVistaNuevaFactura();
    asignarBotonesNuevaFactura();
}

function updateVistaNuevaFactura(){
    $('#contenedor-factura').html("");
    $('#contenedor-factura').html(`
        <div id="contenedor-factura-ver" style="width: 550px;">
            <div id="titulo-factura">
                <label>FACTURA No<span id="span-title-factura-id">${factura.factura_id}<span></label>
            </div>
            <hr>
            <div>
                <div id="datos-factura">
                    <span class="subtitulos-factura">DATOS FACTURA</span>
                    <p><span id="span-input-factura-id"> Factura No:</span> <input type="number" id="input-factura-id" value="${factura.factura_id}"></p>
                    <p><span id="span-input-fecha"> FECHA:</span> <input type="date" id="input-fecha" value="${factura.getFechaFormatoInput()}"></p>
                    <div id="contenedor-buscador-cliente">
                        <button id="form-select-cliente">Seleccionar Cliente</button>
                        <input type="text" id="input-buscador-cliente" placeholder="Código Cliente">
                    </div>
                </div>
                <hr>
                <div id="lineas-factura">
                    <span class="subtitulos-factura">LINEAS DE LA FACTURA</span><br>
                    <div id="contenedor-buscador-producto">
                        <button id="form-agregar-producto">Agregar Producto</button>
                        <input type="text" id="input-buscador-producto" placeholder="Código Producto">
                    </div>
                </div>
                <hr>
                <div>
                    <span class="subtitulos-factura">RESUMEN IMPORTE</span>
                    <div id="resumen-factura">
                        <div>
                            <p>Subtotal:  ${factura.subtotal}&euro;</p>
                            <p>iva:  ${factura.iva}&euro;</p>
                            <p>Total:  ${factura.total}&euro;</p>
                        </div>
                        <button id="aceptar-factura">ACEPTAR FACTURA</button>
                        <button id="modificar-factura" style = "display: none;">ACTUALIZAR FACTURA</button>
                    </div>
                </div>
            </div>
        </div>
    `);
    if(factura.cliente != null){
        $('#contenedor-buscador-cliente').remove();
        $('#datos-factura').append(`
            <p>NOMBRE CLIENTE: ${factura.cliente.nombre}</p>
            <p>NIF: ${factura.cliente.nif}</p>
            <p>DIRECCIÓN: ${factura.cliente.direccion}, ${factura.cliente.poblacion} (${factura.cliente.provincia})</p>
            <div id="contenedor-buscador-cliente">
                <button id="form-select-cliente">Seleccionar Cliente</button>
                <input type="text" id="input-buscador-cliente" placeholder="Código Cliente">
            </div>
        `);
        asignarBotonSelectCliente();
    }
    if(factura.items.length > 0){
        $('#contenedor-buscador-producto').remove();
        var contador = 1;
        factura.items.forEach(item => {
            $('#lineas-factura').append(`
                <p>${contador}. Descripción: ${item.descripcion}
                <button id="boton-delete-item-${item.articulo_id}" style="padding: 11px 11px 5px 11px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button></p>
                <p>&emsp; Cantidad: <input id="input-cantidad-item-${item.articulo_id}" type="number" value="${item.cantidad}"></p>
                <p>&emsp; Precio Unitario: ${item.precio}</p>
                <p>&emsp; Importe: ${item.subtotal}</p>
            `);
            $(`#input-cantidad-item-${item.articulo_id}`).css('width', '70px');
            $(`#boton-delete-item-${item.articulo_id}`).on('click', function () {
                if(confirm("¿Seguro que desea eliminar el Item?")){
                    factura.eliminarItemPorArticuloId(item.articulo_id);
                    updateVistaNuevaFactura();
                    asignarBotonesNuevaFactura();
                }
            });
            $(`#input-cantidad-item-${item.articulo_id}`).blur(function () {
                if($(`#input-cantidad-item-${item.articulo_id}`).val() == "" || $(`#input-cantidad-item-${item.articulo_id}`).val() <= 0){
                    $(`#input-cantidad-item-${item.articulo_id}`).val(parseInt(item.cantidad));
                }
                factura.modificarCantidadItem(item.articulo_id, parseInt($(`#input-cantidad-item-${item.articulo_id}`).val()) - parseInt(item.cantidad));
                $(`#input-cantidad-item-${item.articulo_id}`).val(parseInt(item.cantidad));
                updateVistaNuevaFactura();
                asignarBotonesNuevaFactura();
            });
            contador++;
        });
        $('#lineas-factura').append(`
            <br>
            <div id="contenedor-buscador-producto">
                <button id="form-agregar-producto">Agregar Producto</button>
                <input type="text" id="input-buscador-producto" placeholder="Código Producto">
            <div/>
        `);
        
        ocultarContenedorBuscador();
        if(estoyModificando){
            $('#aceptar-factura').css('display', 'none');
            $('#modificar-factura').css('display', 'block');
        }
    }
}

function mostrarContenedorBuscador() {
    $('#contenedor-factura').css('opacity', 0);
    $('#contenedor-buscador').css('opacity', 0);

    $('#contenedor-buscador').css('display', 'block');

    $('#contenedor-factura').animate({ opacity: 1 }, 500);
    $('#contenedor-buscador').animate({ opacity: 1 }, 500);
}

function ocultarContenedorBuscador() {
    $('#contenedor-factura').css('opacity', 0);
    $('#contenedor-buscador').css('opacity', 0);

    $('#contenedor-buscador').css('display', 'none');

    $('#contenedor-buscador').animate({ opacity: 1 }, 500);
    $('#contenedor-factura').animate({ opacity: 1 }, 500);
}

function asignarBotonesNuevaFactura(){

    asignarBotonSelectCliente();

    $('#form-agregar-producto').on('click', function () {
        $.ajax({
            type: "POST",
            url: "./php/getArticulosNoBorrados.php",
            dataType: "json",
            success: function (respuesta) {
                mostrarContenedorBuscador();
                $('#contenedor-buscador').html("");
                $('#contenedor-buscador').html(`
                    <button id="ocultar-panel">OCULTAR PANEL</button>
                    <table id="tabla-articulos" border=1>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DESCRIPCIÓN</th>
                                <th>PRECIO</th>
                                <th>OPCIONES</th>
                            </tr>
                        </thead>
                        <tbody id="content-table-resu-articulos"></tbody>
                    </table>
                `);
                respuesta.articulos.forEach(articulo => {
                    $('#content-table-resu-articulos').append(`
                        <tr>
                            <td>${articulo.articulo_id}</td>
                            <td>${articulo.descripcion}</td>
                            <td>${articulo.precio} &euro;</td>
                            <td><button id="boton-tabla-select-articulo-${articulo.articulo_id}">SELECCIONAR</button></td>
                        </tr>
                    `);
                    $(`#boton-tabla-select-articulo-${articulo.articulo_id}`).on('click', function () {
                        if(factura.articuloRepetido(articulo.articulo_id)){
                            factura.modificarCantidadItem(articulo.articulo_id, 1);
                        }else{
                            factura.agregarItem(articulo.articulo_id, articulo.descripcion, 1, articulo.precio);
                        }
                        updateVistaNuevaFactura();
                        asignarBotonesNuevaFactura();
                    });
                });

                $('#tabla-articulos').DataTable({
                    paging: false, // Desactivar la paginación
                    //searching: false, // Desactivar la búsqueda
                    info: false, // Desactivar la información de la tabla
                    language: {
                        search: "" // Eliminar la cadena 'Search:'
                    }
                });
                $('.dataTables_filter input').attr('placeholder', 'Buscar clientes...');

                $('#ocultar-panel').css('width', '100%');
                $('#ocultar-panel').css('margin-bottom', '30px');
                $('#ocultar-panel').css('font-family', 'title');
                $('#ocultar-panel').on('click', function(){
                    $('#contenedor-buscador').html("");
                    ocultarContenedorBuscador();
                });
            },
            error: function (_jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus, errorThrown);
            }
        });
    });

    $('#input-buscador-producto').blur(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "./php/getArticulosNoBorrados.php",
            dataType: "json",
            success: function (respuesta) {
                let articuloEncontrado = false;
                respuesta.articulos.forEach(articulo => {
                    if(articulo.articulo_id == $('#input-buscador-producto').val()){
                        if(factura.articuloRepetido(articulo.articulo_id)){
                            factura.modificarCantidadItem(articulo.articulo_id, 1);
                        }else{
                            factura.agregarItem(articulo.articulo_id, articulo.descripcion, 1, articulo.precio);
                        }
                        $('#input-buscador-producto').attr('placeholder', 'Código Producto');
                        updateVistaNuevaFactura();
                        asignarBotonesNuevaFactura();
                        articuloEncontrado = true;
                    }
                });
                if(!articuloEncontrado){
                    $('#input-buscador-producto').val("");
                    $('#input-buscador-producto').attr('placeholder', 'Código No Existe');
                }
            },
            error: function (_jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus, errorThrown);
            }
        });
    });

    console.log("factura");
    $('#input-factura-id').blur(function () {
        let nuevoCodigo = $('#input-factura-id').val();
        if (indicesFacturas.includes(parseInt(nuevoCodigo)) && nuevoCodigo != factura.factura_id){
            $('#input-factura-id').val(factura.factura_id);
            $('#span-input-factura-id').css('color', 'red');
            $('#span-input-factura-id').html("El ID debe ser único:");
        }else if(nuevoCodigo == ""){
            $('#input-factura-id').val(factura.factura_id);
            $('#span-input-factura-id').css('color', 'red');
            $('#span-input-factura-id').html("El ID es Obligatorio:");
        }else if(nuevoCodigo < 0){
            $('#input-factura-id').val(factura.factura_id);
            $('#span-input-factura-id').css('color', 'red');
            $('#span-input-factura-id').html("El ID debe ser Positivo:");
        }else{
            factura.setFacturaId(nuevoCodigo);
            $('#span-input-factura-id').css('color', '#292929');
            $('#span-input-factura-id').html("Factura No:");
            $('#span-title-factura-id').html(nuevoCodigo);
        }
    });

    $('#input-fecha').blur(function () {
        if (!validarFormatoFecha($('#input-fecha').val())) {
            $('#input-fecha').val(factura.getFechaFormatoInput());
            $('#span-input-fecha').css('color', 'red');
            $('#span-input-fecha').html("Fecha Incorrecta:");
        } else {
            factura.setFecha(new Date($('#input-fecha').val()));
            $('#span-input-fecha').css('color', '#292929');
            $('#span-input-fecha').html("FECHA:");
        }
    });
    
    $('#aceptar-factura').on('click', function () {
        if(factura.cliente == null){
            alert("Debes seleccionar un Cliente");
        }
        if(factura.items.length == 0){
            alert("Debes agregar mínimo un Artículo");
        }
        if(factura.items.length != 0 && factura.cliente != null){
            $.ajax({
                type: "POST",
                url: "./php/insertFactura.php",
                data: {
                    factura: (JSON.stringify(factura))
                },
                dataType: "json",
                success: function (respuesta) {
                    if(respuesta.status == 'success'){
                        verFactura(factura.factura_id);
                        updateTablaFacturas();
                        $('#contenedor-buscador').html("");
                        ocultarContenedorBuscador();
                    }
                }
            });
        }
    });

    $('#modificar-factura').on('click', function () {
        if(factura.cliente == null){
            alert("Debes seleccionar un Cliente");
        }
        if(factura.items.length == 0){
            alert("Debes agregar mínimo un Artículo");
        }
        if(factura.items.length != 0 && factura.cliente != null){
            $.ajax({
                type: "POST",
                url: "./php/updateFactura.php",
                data: {
                    factura: (JSON.stringify(factura))
                },
                dataType: "json",
                success: function (respuesta) {
                    if(respuesta.status == 'success'){
                        updateTablaFacturas();
                        $('#contenedor-buscador').html("");
                        ocultarContenedorBuscador();
                        verFactura(factura.factura_id);
                    }else if(respuesta.status == 'error'){
                        console.log(`Error Update: ${respuesta.msg}`);
                    }

                },
                error: function (_jqXHR, textStatus, errorThrown) {
                    console.error("Error: " + textStatus, errorThrown);
                }
            });
        }
    });

}

function asignarBotonSelectCliente(){
    $('#form-select-cliente').on('click', function () {
        $.ajax({
            type: "POST",
            url: "./php/getClientesNoBorrados.php",
            dataType: "json",
            success: function (respuesta) {
                mostrarContenedorBuscador();
                $('#contenedor-buscador').html("");
                $('#contenedor-buscador').html(`
                    <button id="ocultar-panel">OCULTAR PANEL</button>
                    <table id="tabla-clientes" border=1>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOMBRE</th>
                                <th>NIF</th>
                                <th>OPCIONES</th>
                            </tr>
                        </thead>
                        <tbody id="content-table-resu-clientes"></tbody>
                    </table>
                `);
                respuesta.clientes.forEach(cliente => {
                    $('#content-table-resu-clientes').append(`
                        <tr>
                            <td>${cliente.cliente_id}</td>
                            <td>${cliente.nombre}</td>
                            <td>${cliente.nif}</td>
                            <td><button id="boton-tabla-select-cliente-${cliente.cliente_id}">SELECCIONAR</button></td>
                        </tr>
                    `);
                    $(`#boton-tabla-select-cliente-${cliente.cliente_id}`).on('click', function () {
                        factura.setCliente(cliente.cliente_id, cliente.nombre, cliente.nif, cliente.direccion, cliente.poblacion, cliente.provincia);
                        updateVistaNuevaFactura();
                        asignarBotonesNuevaFactura();
                    });
                });

                $('#tabla-clientes').DataTable({
                    paging: false, // Desactivar la paginación
                    //searching: false, // Desactivar la búsqueda
                    info: false, // Desactivar la información de la tabla
                    language: {
                        search: "" // Eliminar la cadena 'Search:'
                    }
                });
                $('.dataTables_filter input').attr('placeholder', 'Buscar clientes...');

                $('#ocultar-panel').css('width', '100%');
                $('#ocultar-panel').css('margin-bottom', '30px');
                $('#ocultar-panel').css('font-family', 'title');
                $('#ocultar-panel').on('click', function(){
                    $('#contenedor-buscador').html("");
                    ocultarContenedorBuscador();
                });
            },
            error: function (_jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus, errorThrown);
            }
        });
    });

    $('#input-buscador-cliente').blur(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "./php/getClientesNoBorrados.php",
            dataType: "json",
            success: function (respuesta) {
                let clienteEncontrado = false;
                respuesta.clientes.forEach(cliente => {
                    if(cliente.cliente_id == $('#input-buscador-cliente').val()){
                        factura.setCliente(cliente.cliente_id, cliente.nombre, cliente.nif, cliente.direccion, cliente.poblacion, cliente.provincia);
                        $('#input-buscador-cliente').attr('placeholder', 'Código Cliente');
                        updateVistaNuevaFactura();
                        asignarBotonesNuevaFactura();
                        clienteEncontrado = true;
                    }
                });
                if(!clienteEncontrado){
                    $('#input-buscador-cliente').attr('placeholder', 'Cliente No Existe');
                    $('#input-buscador-cliente').val("");
                }
            },
            error: function (_jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus, errorThrown);
            }
        });
    });
}