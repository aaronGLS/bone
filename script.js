// 1. Referencias a los botones
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const catImage = document.querySelector('.cat-img');

// Array de GIFs para cambiar
const catGifs = [
    'assets/sad.gif',
    'assets/sad2.gif',
    'assets/sad3.gif',
    'assets/sad4.gif',
    'assets/sad5.gif'
]; // Asegúrate de tener estos archivos en tu carpeta assets

// Índice para rastrear el GIF actual
let currentGifIndex = 0;

// 2. Evento al hacer clic en "Sí"
yesBtn.addEventListener('click', (e) => {
    createExplosion(e);
    
    // Crear nueva página HTML dinámicamente con la MISMA estructura y mismos estilos
    const newPage = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>¡Gracias por decir que sí! ❤️</title>
          <!-- Vinculamos la misma hoja de estilos y fuente -->
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
            rel="stylesheet"
          >
          <link rel="stylesheet" href="styles.css">
      </head>
      <body>
          <div class="container">
              <h1>¡Sabía que dirías que sí! ❤️</h1>
              <div class="cat-container">
                  <img src="assets/catkiss.gif" alt="Gatito Feliz" class="cat-img">
              </div>
              <div class="button-container">
                  <button id="myNewButton" style="background-color: #9b59b6;">¡Clickeame!</button>
              </div>
          </div>
          <script>
            document.addEventListener('DOMContentLoaded', () => {
              const newButton = document.getElementById('myNewButton');
              newButton.addEventListener('click', () => {
                window.location.href = './carta/carta.html'; // Añadido ./ para asegurar la ruta relativa
              });
            });
          </script>
      </body>
      </html>
    `;
    
    // Sobrescribir el documento para mostrar la nueva “página”
    document.open();
    document.write(newPage);
    document.close();
});

// 3. Evento al hacer clic en "No"
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Cambiar el GIF
    currentGifIndex = (currentGifIndex + 1) % catGifs.length;
    catImage.src = catGifs[currentGifIndex];
    
    // Calcular posición aleatoria dentro de la ventana
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const randomX = Math.max(0, Math.floor(Math.random() * (windowWidth - noBtn.offsetWidth)));
    const randomY = Math.max(0, Math.floor(Math.random() * (windowHeight - noBtn.offsetHeight)));
    
    // Mover el botón "No" a esa posición
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});

// 4. Función que crea la explosión de emojis
function createExplosion(event) {
    const x = event.clientX;
    const y = event.clientY;
    const particles = 20;
    for (let i = 0; i < particles; i++) {
        createParticle(x, y);
    }
}

function createParticle(x, y) {
    const particle = document.createElement('span');
    particle.innerText = '💖'; // Emoji de tu preferencia
    particle.style.position = 'absolute';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = '24px';
    particle.style.transition = 'transform 1s ease, opacity 1s ease';

    document.body.appendChild(particle);
    particle.offsetWidth; // Forzar reflow (truco CSS)

    // Ángulo y “radio” de dispersión
    const angle = Math.random() * 2 * Math.PI;
    const radius = 100 + Math.random() * 50;
    const finalX = x + radius * Math.cos(angle);
    const finalY = y + radius * Math.sin(angle);

    // Movimiento/transform final y desvanecimiento
    particle.style.transform = `translate(${finalX - x}px, ${finalY - y}px)`;
    particle.style.opacity = 0;

    // Eliminar la partícula tras 1 segundo
    setTimeout(() => {
        document.body.removeChild(particle);
    }, 1000);
}

// Reproducir música al cargar la página
window.addEventListener('load', () => {
  const audio = new Audio('assets/Coldplay - Yellow(Sub Español Lyrics).mp3'); // Asegúrate de que el archivo exista en la carpeta assets
  audio.play().catch(error => {
    console.error('Error al reproducir la música:', error);
  });
});
