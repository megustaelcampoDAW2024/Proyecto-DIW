# **Proyecto DIW - Documentación**

## **Parte 1: Web personalizada**

### **Rejilla responsive para diferentes dispositivos**
He utilizado diferentes propiedades de Bootstrap (`d-flex`, `m-[width]-N`, `p-[width]-N`...) para ajustar los componentes a cada escenario posible

### **Diferentes componentes de Bootstrap**
He implementado varios componentes de Bootstrap como la barra de navegación, botones, un carrusel para mostrar los proyectos y modales para mostrar los vídeos. Estos componentes ayudan a mantener un diseño consistente y responsivo.

```html
<!-- Barra de navegación de Bootstrap -->
<nav class="navbar navbar-expand navbar-dark bg-transparent fixed-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon text-white"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
        <ul class="navbar-nav mx-auto">
            <li class="nav-item my-2 mx-4"><a class="nav-link text-white" href="#">Inicio</a></li>
            <li class="nav-item my-2 mx-4"><a class="nav-link text-white" href="#projects">Proyectos</a></li>
            <li class="nav-item my-2 mx-4"><a class="nav-link text-white" href="#curriculum">Currículum</a></li>
            <li class="nav-item my-2 mx-4"><a class="nav-link text-white" href="https://github.com/megustaelcampoDAW2024" target="_blank">Github</a></li>
        </ul>
    </div>
</nav>

<!-- Carrusel de Bootstrap -->
<div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-inner text-white">
        <div class="carousel-item p-5 active" id="card-glass">
            <!-- Contenido del carrusel -->
        </div>
        <!-- Más items del carrusel -->
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>

<!-- Ejemplo de Modal de Bootstrap -->
<div class="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="videoModal1Label" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="videoModal1Label">Tutorial JS</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="ratio ratio-16x9">
                    <video src="./resources/img/AprendeJS.mp4" controls></video>
                </div>
            </div>
        </div>
    </div>
</div>
```

### **Archivo .css**
He creado un archivo CSS personalizado (`style.css`) para aplicar estilos específicos que no están cubiertos por las clases de Bootstrap. Este archivo se encuentra en la carpeta `css`.
Además, como estilo adicional, he usado un recurso de la web [Spline](https://spline.design/) para el background de la web

```css
/* Archivo: css/style.css */
/* Estilos personalizados */
body {
    background-color: #000;
    color: #fff;
}

.navbar {
    background-color: rgba(0, 0, 0, 0.5);
}

#card-glass {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
}
```

### **Sass: archivo custom.css reducido**
He utilizado Sass para generar un archivo CSS reducido (`custom.css`). Este archivo se encuentra en la carpeta `sass` y se compila utilizando el script de build definido en `package.json`.

```scss
// Archivo: sass/custom.scss
$primary-color: #ffcc00;
$secondary-color: #333;

body {
    background-color: $secondary-color;
    color: $primary-color;
}

.navbar {
    background-color: rgba($secondary-color, 0.5);
}

#card-glass {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
}
```

### **Compilación de Sass a CSS**
```json
// Archivo: package.json
{
  "scripts": {
    "build-css": "sass sass/custom.scss css/custom.css --style compressed"
  }
}
```

## **Parte 2: Contenido multimedia**

### **Optimización de contenido multimedia**
He optimizado las imágenes y vídeos utilizados en la web para asegurar tiempos de carga rápidos y una mejor experiencia de usuario. Las imágenes y vídeos se encuentran en la carpeta `resources/img`.

### **Justificación de la optimización**
Optimizar el contenido multimedia es crucial para mejorar el rendimiento de la web y reducir el tiempo de carga. Esto es especialmente importante para usuarios con conexiones lentas. En mi caso he optimizado los recursos manteniendo sus formatos con la web [Optimizador Web](https://www.shopify.com/es/herramientas/redimensionador-optimizador-imagenes)

### **Justificación del uso de diferentes formatos**
He utilizado formatos de imagen como JPEG y PNG dependiendo de la necesidad de transparencia y calidad. Para los vídeos, he utilizado formatos como MP4 que son ampliamente soportados y ofrecen una buena relación calidad-tamaño.

```html
<!-- Ejemplo de imagen optimizada -->
<img src="./resources/img/optimized-image.jpg" alt="Descripción de la imagen" width="600" height="400">

<!-- Ejemplo de vídeo optimizado -->
<video src="./resources/img/optimized-video.mp4" controls width="600" height="400"></video>
```

## **Parte 3: Accesibilidad y usabilidad**

### **Principios de accesibilidad**

#### 3.1 Etiquetas Semánticas HTML5
- Se han utilizado etiquetas semánticas como `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` para estructurar el contenido de manera clara y lógica.
- Esto facilita la navegación para lectores de pantalla y otros dispositivos asistenciales.

#### 3.2 Textos Alternativos para Imágenes
Todas las imágenes en el sitio tienen atributos `alt` descriptivos que describen su propósito o contenido.

#### 3.3 Contraste de Colores
- Se ha seleccionado un esquema de colores que cumple con los requisitos mínimos de contraste establecidos por WCAG (relación de contraste de al menos 4.5:1 entre texto y fondo).
- Esto asegura que el texto sea legible para personas con deficiencias visuales.

#### 3.4 Navegación por Teclado
- Todos los elementos interactivos (botones, enlaces, formularios) son completamente accesibles mediante el teclado.
- Se ha probado que el usuario pueda navegar por el sitio utilizando únicamente la tecla "Tab".

#### 3.5 Etiquetas ARIA (Accessible Rich Internet Applications)
- Se han agregado atributos ARIA donde sea necesario para mejorar la compatibilidad con lectores de pantalla.
- Ejemplos:

```html
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
```

#### 3.6 Títulos Descrptivos
- Se ha maracado al documento raíz con un titulo que describe el docuento que se ha presentado
``` html
<title>Proyecto Diseño de Interfaces Web | Pablo Bejarano</title>
```

#### 3.7 Metadatos Estructurados
- Se han implementado metadatos estructurados en formato Schema.org para proporcionar información adicional sobre los proyectos y mejorar la accesibilidad semántica.
- El archivo adjunto se encuentra en `/json/schema-proyectos.json`
``` json
[
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Sistema de Gestión Constructora",
      "description": "Un sistema desarrollado con PHP y Laravel para administrar las operaciones de una constructora...",
      "url": "https://megustaelcampo.com/proyectos/gestion-constructora"
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Sistema de Gestión de Facturación",
      "description": "Un programa desarrollado con JavaScript, JQuery y PHP para gestionar las facturas de una tienda de electrónica...",
      "url": "https://megustaelcampo.com/proyectos/gestion-facturacion"
    },
    {
      "@context": "https://schema.org",
      "@type": "Game",
      "name": "Juego del Ahorcado",
      "description": "Un juego interactivo desarrollado con Vue.js y PHP...",
      "url": "https://megustaelcampo.com/proyectos/juego-ahorcado-vue"
    }
]
```

### **Desafíos de accesibilidad**
He revisado la web para asegurar que cumple con los desafíos de accesibilidad planteados en el apartado 8 del tema de accesibilidad. Esto incluye la navegación con teclado y el uso de colores contrastantes.

### **Evaluación y testeo de accesibilidad**
He utilizado herramientas como Lighthouse y WAVE para evaluar la accesibilidad de la web. Estas herramientas me han ayudado a identificar y corregir problemas de accesibilidad.

### **Análisis de usabilidad**
He analizado la usabilidad de la web siguiendo las pautas del apartado 5.2 del tema de usabilidad. Esto incluye la facilidad de navegación, la claridad de la información y la consistencia del diseño.

## **Guía de Estilos**

1. Colores:
Principal: Amarillo (#fccb46) - Usado en el título ("MEGUSTAELCAMPO") y en los botones ("Ver Currículum") y posteriores.
Secundarios: Gradiente de colores saturados (morado, naranja, amarillo, verde) - Usados en el fondo.

2. Tipografía:
Título: 'faodu' - Una tipografía con un estilo moderno y atrevido.
Cuerpo de texto: Fuente base de Bootstrap ('Helvetica Neue', 'Helvetica', 'Arial', sans-serif) - Una tipografía legible y funcional.

3. Botones:
Color de fondo: Amarillo (#fccb46).
Color de texto: Negro o un color oscuro para asegurar el contraste.

4. Fondo:
Estilo: Gradiente de colores saturados y difuminados, creando un efecto llamativo y moderno.
Recusrso extraido de: [Spline](https://spline.design/)

![2D Shapes (1)](https://github.com/user-attachments/assets/c9075e6e-17fc-4ee8-91ed-2c620b693016)

## **Recursos utilizados**
- [Bootstrap Documentation](https://getbootstrap.esdocu.com/docs/5.3/getting-started/introduction/)
- [Bootstrap Cheatsheet](https://bootstrap-cheatsheet.themeselection.com/)
- [Optimización de contenido multimedia](https://www.eniun.com/formatos-archivos-video-conversiones-web/)
- [Accesibilidad web](https://www.eniun.com/diseno-desarrollo-webs-accesibles-accesibilidad-web/)
- [Usabilidad web](https://www.eniun.com/tutorial-usabilidad-web/)

## **Conclusiones**
El proyecto ha sido una excelente oportunidad para aplicar los conocimientos adquiridos en el curso. He aprendido a utilizar Bootstrap para crear una web responsiva y a optimizar contenido multimedia para mejorar el rendimiento. Además, he aplicado principios de accesibilidad y usabilidad para asegurar que la web sea accesible y fácil de usar para todos los usuarios, así como mejorar el SEO de la web