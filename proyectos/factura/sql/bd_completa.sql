--
-- Estructura de tabla para la tabla `articulo`
--

CREATE TABLE `articulo` (
  `articulo_id` int(11) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `borrado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulo`
--

INSERT INTO `articulo` (`articulo_id`, `descripcion`, `precio`, `borrado`) VALUES
(1, 'Producto X', 10.00, 0),
(2, 'Producto Y', 20.00, 0),
(3, 'Servicio de Instalación', 50.00, 0),
(4, 'Teclado Mecánico', 75.50, 0),
(5, 'Monitor 27 pulgadas', 250.00, 0),
(6, 'Ratón Inalámbrico', 15.99, 0),
(7, 'Silla Ergonómica', 180.00, 0),
(8, 'Cable HDMI 2m', 8.95, 0),
(9, 'Altavoces Bluetooth', 45.00, 0),
(10, 'Licencia Software', 99.99, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `cliente_id` int(11) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `nif` varchar(500) NOT NULL,
  `direccion` varchar(500) NOT NULL,
  `telefono` varchar(500) DEFAULT NULL,
  `cp` int(11) DEFAULT NULL,
  `provincia` varchar(500) NOT NULL,
  `poblacion` varchar(500) DEFAULT NULL,
  `borrado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`cliente_id`, `nombre`, `nif`, `direccion`, `telefono`, `cp`, `provincia`, `poblacion`, `borrado`) VALUES
(1, 'ACME S.A.', 'B12345678', 'Calle Mayor, 15', '912345678', 28001, 'Madrid', 'Madrid', 0),
(2, 'Juan Pérez', '12345678A', 'Avenida de la Paz, 22', '600123456', 46021, 'Valencia', 'Valencia', 0),
(3, 'Informática López S.L.', 'B87654321', 'Calle del Comercio, 10', '934567890', 8003, 'Barcelona', 'Barcelona', 0),
(4, 'María García', '87654321B', 'Plaza Nueva, 5', '666555444', 14001, 'Córdoba', 'Córdoba', 0),
(5, 'Electrodomésticos Martínez', 'A98765432', 'Calle Ancha, 30', '952123456', 29008, 'Málaga', 'Málaga', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `factura_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT 0.00,
  `iva` decimal(10,2) DEFAULT 0.00,
  `total` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`factura_id`, `cliente_id`, `fecha`, `subtotal`, `iva`, `total`) VALUES
(1, 1, '2024-06-17', 50.00, 10.50, 60.50),
(2, 2, '2024-06-18', 123.47, 25.93, 149.40),
(3, 3, '2024-06-19', 350.00, 73.50, 423.50),
(4, 4, '2024-06-20', 144.75, 30.40, 175.15),
(5, 5, '2024-06-20', 369.99, 77.70, 447.69),
(6, 2, '2024-12-30', 1626.95, 341.66, 1968.61),
(7, 1, '2024-12-30', 50.00, 10.50, 60.50),
(8, 3, '2024-12-30', 250.00, 52.50, 302.50),
(9, 4, '2024-12-30', 250.00, 52.50, 302.50),
(10, 1, '2024-12-31', 151.00, 31.71, 182.71),
(11, 2, '2025-01-03', 85.50, 17.96, 103.46),
(12, 5, '2025-01-03', 105.99, 22.26, 128.25),
(13, 4, '2025-01-03', 179.99, 37.80, 217.79),
(14, 5, '2025-01-03', 250.00, 52.50, 302.50),
(15, 2, '2025-01-03', 15.99, 3.36, 19.35),
(17, 1, '2025-01-03', 6590.00, 1383.90, 7973.90),
(18, 3, '2025-01-02', 265.99, 55.86, 321.85),
(19, 1, '2025-01-04', 80.00, 16.80, 96.80),
(21, 2, '2025-01-01', 97.97, 20.57, 118.54);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `factura_id` int(11) NOT NULL,
  `articulo_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `item`
--

INSERT INTO `item` (`item_id`, `factura_id`, `articulo_id`, `cantidad`, `precio`, `subtotal`) VALUES
(1, 1, 1, 5, 10.00, 50.00),
(3, 2, 4, 1, 75.50, 75.50),
(4, 2, 6, 3, 15.99, 47.97),
(5, 3, 3, 2, 50.00, 100.00),
(6, 3, 5, 1, 250.00, 250.00),
(7, 4, 1, 10, 10.00, 100.00),
(8, 4, 8, 5, 8.95, 44.75),
(9, 5, 7, 1, 180.00, 180.00),
(10, 5, 9, 2, 45.00, 90.00),
(11, 5, 10, 1, 99.99, 99.99),
(16, 6, 5, 5, 250.00, 1250.00),
(17, 6, 6, 2, 15.99, 31.98),
(18, 6, 9, 1, 45.00, 45.00),
(19, 6, 10, 3, 99.99, 299.97),
(24, 7, 3, 1, 50.00, 50.00),
(25, 8, 5, 1, 250.00, 250.00),
(26, 9, 5, 1, 250.00, 250.00),
(271, 11, 1, 1, 10.00, 10.00),
(272, 11, 4, 1, 75.50, 75.50),
(274, 10, 4, 2, 75.50, 151.00),
(275, 12, 6, 1, 15.99, 15.99),
(276, 12, 9, 2, 45.00, 90.00),
(277, 13, 1, 3, 10.00, 30.00),
(278, 13, 3, 1, 50.00, 50.00),
(279, 13, 10, 1, 99.99, 99.99),
(281, 15, 6, 1, 15.99, 15.99),
(362, 21, 3, 1, 50.00, 50.00),
(363, 21, 6, 3, 15.99, 47.97),
(376, 14, 5, 1, 250.00, 250.00),
(383, 19, 1, 2, 10.00, 20.00),
(384, 19, 2, 3, 20.00, 60.00),
(388, 18, 5, 1, 250.00, 250.00),
(389, 18, 6, 1, 15.99, 15.99),
(390, 17, 4, 20, 75.50, 1510.00),
(391, 17, 5, 20, 250.00, 5000.00),
(392, 17, 2, 4, 20.00, 80.00);

--
-- Disparadores `item`
--
DELIMITER $$
CREATE TRIGGER `tr_factura_delete` AFTER DELETE ON `item` FOR EACH ROW BEGIN
  UPDATE factura
  SET subtotal = (SELECT COALESCE(SUM(subtotal), 0) FROM item WHERE factura_id = OLD.factura_id),
      iva = (SELECT COALESCE(SUM(subtotal), 0) * 0.21 FROM item WHERE factura_id = OLD.factura_id),
      total = (SELECT COALESCE(SUM(subtotal), 0) * 1.21 FROM item WHERE factura_id = OLD.factura_id)
  WHERE factura_id = OLD.factura_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_factura_insert` AFTER INSERT ON `item` FOR EACH ROW BEGIN
  UPDATE factura
  SET subtotal = (SELECT COALESCE(SUM(subtotal), 0) FROM item WHERE factura_id = NEW.factura_id),
      iva = (SELECT COALESCE(SUM(subtotal), 0) * 0.21 FROM item WHERE factura_id = NEW.factura_id),
      total = (SELECT COALESCE(SUM(subtotal), 0) * 1.21 FROM item WHERE factura_id = NEW.factura_id)
  WHERE factura_id = NEW.factura_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_factura_update` AFTER UPDATE ON `item` FOR EACH ROW BEGIN
  UPDATE factura
  SET subtotal = (SELECT COALESCE(SUM(subtotal), 0) FROM item WHERE factura_id = NEW.factura_id),
      iva = (SELECT COALESCE(SUM(subtotal), 0) * 0.21 FROM item WHERE factura_id = NEW.factura_id),
      total = (SELECT COALESCE(SUM(subtotal), 0) * 1.21 FROM item WHERE factura_id = NEW.factura_id)
  WHERE factura_id = NEW.factura_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_item_insert` BEFORE INSERT ON `item` FOR EACH ROW BEGIN
  SET NEW.subtotal = NEW.cantidad * NEW.precio;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_item_update` BEFORE UPDATE ON `item` FOR EACH ROW BEGIN
  SET NEW.subtotal = NEW.cantidad * NEW.precio;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_facturas_info_cliente`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_facturas_info_cliente` (
`Codigo_Factura` int(11)
,`Fecha` varchar(10)
,`Subtotal` decimal(10,2)
,`IVA` decimal(10,2)
,`Total` decimal(10,2)
,`ID_Cliente` int(11)
,`Nombre_Cliente` varchar(500)
,`NIF_Cliente` varchar(500)
,`Direccion_Cliente` varchar(500)
,`Telefono_Cliente` varchar(500)
,`CP_Cliente` int(11)
,`Provincia_Cliente` varchar(500)
,`Poblacion_Cliente` varchar(500)
,`Cliente_Borrado` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_facturas_resumen`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_facturas_resumen` (
`Codigo_Factura` int(11)
,`Fecha` varchar(10)
,`Nombre_Cliente` varchar(500)
,`Total` decimal(10,2)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_facturas_info_cliente`
--
DROP TABLE IF EXISTS `vista_facturas_info_cliente`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_facturas_info_cliente`  AS SELECT `f`.`factura_id` AS `Codigo_Factura`, date_format(`f`.`fecha`,'%d/%m/%Y') AS `Fecha`, `f`.`subtotal` AS `Subtotal`, `f`.`iva` AS `IVA`, `f`.`total` AS `Total`, `c`.`cliente_id` AS `ID_Cliente`, `c`.`nombre` AS `Nombre_Cliente`, `c`.`nif` AS `NIF_Cliente`, `c`.`direccion` AS `Direccion_Cliente`, `c`.`telefono` AS `Telefono_Cliente`, `c`.`cp` AS `CP_Cliente`, `c`.`provincia` AS `Provincia_Cliente`, `c`.`poblacion` AS `Poblacion_Cliente`, `c`.`borrado` AS `Cliente_Borrado` FROM (`factura` `f` join `cliente` `c` on(`f`.`cliente_id` = `c`.`cliente_id`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_facturas_resumen`
--
DROP TABLE IF EXISTS `vista_facturas_resumen`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_facturas_resumen`  AS SELECT `f`.`factura_id` AS `Codigo_Factura`, date_format(`f`.`fecha`,'%d/%m/%Y') AS `Fecha`, `c`.`nombre` AS `Nombre_Cliente`, `f`.`total` AS `Total` FROM (`factura` `f` join `cliente` `c` on(`f`.`cliente_id` = `c`.`cliente_id`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD PRIMARY KEY (`articulo_id`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`cliente_id`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`factura_id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `factura_id` (`factura_id`),
  ADD KEY `articulo_id` (`articulo_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulo`
--
ALTER TABLE `articulo`
  MODIFY `articulo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `cliente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `factura_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=393;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`cliente_id`);

--
-- Filtros para la tabla `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`factura_id`) REFERENCES `factura` (`factura_id`),
  ADD CONSTRAINT `item_ibfk_2` FOREIGN KEY (`articulo_id`) REFERENCES `articulo` (`articulo_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
