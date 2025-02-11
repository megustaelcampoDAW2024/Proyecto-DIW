-- Base de datos para el programa de facturación

-- Creación de la tabla cliente
CREATE TABLE cliente (
    cliente_id int NOT NULL AUTO_INCREMENT,
    nombre varchar(500) NOT NULL,
    nif varchar(500) NOT NULL,
    direccion varchar(500) NOT NULL,
    telefono varchar(500),
    cp int,
    provincia varchar(500) NOT NULL,
    poblacion varchar(500),
    borrado BOOLEAN DEFAULT FALSE,  -- Nueva columna para borrado lógico
    PRIMARY KEY (cliente_id)
);

-- Creación de la tabla articulo
CREATE TABLE articulo (
    articulo_id int NOT NULL AUTO_INCREMENT,
    descripcion varchar(500) NOT NULL,
    precio decimal(10,2) NOT NULL,
    borrado BOOLEAN DEFAULT FALSE, -- Nueva columna para borrado lógico
    PRIMARY KEY (articulo_id)
);

-- Creación de la tabla factura
CREATE TABLE factura (
    factura_id int NOT NULL AUTO_INCREMENT,
    cliente_id int NOT NULL,
    fecha date,
    subtotal decimal(10,2) DEFAULT 0,
    iva decimal(10,2) DEFAULT 0,
    total decimal(10,2) DEFAULT 0,
    PRIMARY KEY (factura_id),
    FOREIGN KEY (cliente_id) REFERENCES cliente (cliente_id)
);

-- Creación de la tabla item
CREATE TABLE item (
    item_id int NOT NULL AUTO_INCREMENT,
    factura_id int NOT NULL,
    articulo_id int NOT NULL,
    cantidad int NOT NULL,
    precio decimal(10,2) NOT NULL,
    subtotal decimal(10,2) DEFAULT 0,
    PRIMARY KEY (item_id),
    FOREIGN KEY (factura_id) REFERENCES factura (factura_id),
    FOREIGN KEY (articulo_id) REFERENCES articulo (articulo_id)
);

-- Triggers para la tabla item

-- Trigger para calcular el subtotal del item en INSERT
DELIMITER //
CREATE TRIGGER tr_item_insert
BEFORE INSERT ON item
FOR EACH ROW
BEGIN
  SET NEW.subtotal = NEW.cantidad * NEW.precio;
END;
//
DELIMITER ;

-- Trigger para calcular el subtotal del item en UPDATE
DELIMITER //
CREATE TRIGGER tr_item_update
BEFORE UPDATE ON item
FOR EACH ROW
BEGIN
  SET NEW.subtotal = NEW.cantidad * NEW.precio;
END;
//
DELIMITER ;

-- Triggers para la tabla factura

-- Trigger para actualizar la factura después de INSERT en item
DELIMITER //
CREATE TRIGGER tr_factura_insert
AFTER INSERT ON item
FOR EACH ROW
BEGIN
  UPDATE factura
  SET subtotal = (SELECT COALESCE(SUM(subtotal), 0) FROM item WHERE factura_id = NEW.factura_id),
      iva = (SELECT COALESCE(SUM(subtotal), 0) * 0.21 FROM item WHERE factura_id = NEW.factura_id),
      total = (SELECT COALESCE(SUM(subtotal), 0) * 1.21 FROM item WHERE factura_id = NEW.factura_id)
  WHERE factura_id = NEW.factura_id;
END;
//
DELIMITER ;

-- Trigger para actualizar la factura después de UPDATE en item
DELIMITER //
CREATE TRIGGER tr_factura_update
AFTER UPDATE ON item
FOR EACH ROW
BEGIN
  UPDATE factura
  SET subtotal = (SELECT COALESCE(SUM(subtotal), 0) FROM item WHERE factura_id = NEW.factura_id),
      iva = (SELECT COALESCE(SUM(subtotal), 0) * 0.21 FROM item WHERE factura_id = NEW.factura_id),
      total = (SELECT COALESCE(SUM(subtotal), 0) * 1.21 FROM item WHERE factura_id = NEW.factura_id)
  WHERE factura_id = NEW.factura_id;
END;
//
DELIMITER ;

-- Trigger para actualizar la factura después de DELETE en item
DELIMITER //
CREATE TRIGGER tr_factura_delete
AFTER DELETE ON item
FOR EACH ROW
BEGIN
  UPDATE factura
  SET subtotal = (SELECT COALESCE(SUM(subtotal), 0) FROM item WHERE factura_id = OLD.factura_id),
      iva = (SELECT COALESCE(SUM(subtotal), 0) * 0.21 FROM item WHERE factura_id = OLD.factura_id),
      total = (SELECT COALESCE(SUM(subtotal), 0) * 1.21 FROM item WHERE factura_id = OLD.factura_id)
  WHERE factura_id = OLD.factura_id;
END;
//
DELIMITER ;

-- Inserts de ejemplo para la tabla articulo
INSERT INTO articulo (descripcion, precio) VALUES
('Producto X', 10.00),
('Producto Y', 20.00),
('Servicio de Instalación', 50.00),
('Teclado Mecánico', 75.50),
('Monitor 27 pulgadas', 250.00),
('Ratón Inalámbrico', 15.99),
('Silla Ergonómica', 180.00),
('Cable HDMI 2m', 8.95),
('Altavoces Bluetooth', 45.00),
('Licencia Software', 99.99);

-- Inserts de ejemplo para la tabla cliente
INSERT INTO cliente (nombre, nif, direccion, telefono, cp, provincia, poblacion) VALUES
('ACME S.A.', 'B12345678', 'Calle Mayor, 15', '912345678', 28001, 'Madrid', 'Madrid'),
('Juan Pérez', '12345678A', 'Avenida de la Paz, 22', '600123456', 46021, 'Valencia', 'Valencia'),
('Informática López S.L.', 'B87654321', 'Calle del Comercio, 10', '934567890', 08003, 'Barcelona', 'Barcelona'),
('María García', '87654321B', 'Plaza Nueva, 5', '666555444', 14001, 'Córdoba', 'Córdoba'),
('Electrodomésticos Martínez', 'A98765432', 'Calle Ancha, 30', '952123456', 29008, 'Málaga', 'Málaga');

-- Inserts de ejemplo para la tabla factura (sin datos calculados, se generan por triggers)
INSERT INTO factura (cliente_id, fecha) VALUES
(1, '2024-06-17'),
(2, '2024-06-18'),
(3, '2024-06-19'),
(4, '2024-06-20'),
(5, '2024-06-20');

-- Inserts de ejemplo para la tabla item (sin subtotal, se genera por trigger)
-- Factura 1
INSERT INTO item (factura_id, articulo_id, cantidad, precio) VALUES
(1, 1, 5, 10.00),
(1, 2, 2, 20.00);

-- Factura 2
INSERT INTO item (factura_id, articulo_id, cantidad, precio) VALUES
(2, 4, 1, 75.50),
(2, 6, 3, 15.99);

-- Factura 3
INSERT INTO item (factura_id, articulo_id, cantidad, precio) VALUES
(3, 3, 2, 50.00),
(3, 5, 1, 250.00);

-- Factura 4
INSERT INTO item (factura_id, articulo_id, cantidad, precio) VALUES
(4, 1, 10, 10.00),
(4, 8, 5, 8.95);

-- Factura 5
INSERT INTO item (factura_id, articulo_id, cantidad, precio) VALUES
(5, 7, 1, 180.00),
(5, 9, 2, 45.00),
(5, 10, 1, 99.99);

-- Vistas

-- Vista Facturas Resumen

CREATE OR REPLACE VIEW vista_facturas_resumen AS
SELECT
    f.factura_id AS "Codigo_Factura",
    DATE_FORMAT(f.fecha, '%d/%m/%Y') AS "Fecha",  -- Formato de fecha DD/MM/YYYY
    c.nombre AS "Nombre_Cliente",
    f.total AS "Total"
FROM
    factura f
JOIN
    cliente c ON f.cliente_id = c.cliente_id;

-- Vista Facturas con Info Clientes

-- Vista Facturas Información Cliente

CREATE OR REPLACE VIEW vista_facturas_info_cliente AS
SELECT
    f.factura_id AS "Codigo_Factura",
    DATE_FORMAT(f.fecha, '%d/%m/%Y') AS "Fecha",  -- Formato de fecha DD/MM/YYYY
    f.subtotal AS "Subtotal",
    f.iva AS "IVA",
    f.total AS "Total",
    c.cliente_id AS "ID_Cliente",
    c.nombre AS "Nombre_Cliente",
    c.nif AS "NIF_Cliente",
    c.direccion AS "Direccion_Cliente",
    c.telefono AS "Telefono_Cliente",
    c.cp AS "CP_Cliente",
    c.provincia AS "Provincia_Cliente",
    c.poblacion AS "Poblacion_Cliente",
    c.borrado AS "Cliente_Borrado"
FROM
    factura f
JOIN
    cliente c ON f.cliente_id = c.cliente_id;

-- Procedimiento para marcar un artículo como borrado
DELIMITER //
CREATE PROCEDURE marcar_articulo_borrado(IN p_articulo_id INT)
BEGIN
    UPDATE articulo SET borrado = TRUE WHERE articulo_id = p_articulo_id;
END //
DELIMITER ;

-- Procedimiento para marcar un cliente como borrado
DELIMITER //
CREATE PROCEDURE marcar_cliente_borrado(IN p_cliente_id INT)
BEGIN
    UPDATE cliente SET borrado = TRUE WHERE cliente_id = p_cliente_id;
END //
DELIMITER ;

-- Llmadas a los procedimientos
-- CALL marcar_articulo_borrado(ID_DEL_ARTICULO);
-- CALL marcar_cliente_borrado(ID_DEL_CLIENTE);