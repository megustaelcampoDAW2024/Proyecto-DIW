CREATE TABLE usuarios (
    email VARCHAR(255) PRIMARY KEY,
    pwd VARCHAR(255) NOT NULL,
    rol VARCHAR(25) NOT NULL,
    puntuacion INT
);

INSERT INTO usuarios (email, pwd, rol, puntuacion) VALUES
('pbejvil955@g.educaand.es', 'pwd', 'admin',230),
('usuario1@example.com', 'pwd1', 'player', 100),
('usuario2@example.com', 'pwd2', 'player', 85),
('usuario3@example.com', 'pwd3', 'player', 120),
('usuario4@example.com', 'pwd4', 'player', 90),
('usuario5@example.com', 'pwd5', 'player', 75),
('usuario6@example.com', 'pwd6', 'player', 110),
('usuario7@example.com', 'pwd7', 'player', 95),
('usuario8@example.com', 'pwd8', 'player', 130),
('usuario9@example.com', 'pwd9', 'player', 80),
('usuario10@example.com', 'pwd10', 'player', 105);

CREATE TABLE partidas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    palabra VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    puntuacion_final INT NOT NULL,
    FOREIGN KEY (email) REFERENCES usuarios(email)
);

CREATE TABLE palabras (
    id_palabra INT PRIMARY KEY AUTO_INCREMENT,
    palabra VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL
);

INSERT INTO palabras (palabra, categoria) VALUES
('casa', 'hogar'),
('mesa', 'hogar'),
('silla', 'hogar'),
('perro', 'animal'),
('gato', 'animal'),
('pajaro', 'animal'),
('ordenador', 'tecnologia'),
('movil', 'tecnologia'),
('tablet', 'tecnologia'),
('libro', 'cultura'),
('pelicula', 'cultura'),
('musica', 'cultura'),
('futbol', 'deporte'),
('baloncesto', 'deporte'),
('tenis', 'deporte');