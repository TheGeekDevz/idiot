/* [Nov 2026] Versión Segura - Clic Universal con Tamaño de Altavoz Fijo */
window.addEventListener('load', iniciarPagina);

function iniciarPagina() {
    // DETECTOR DE CLIC UNIVERSAL: Cualquier clic en la pantalla controla el sonido
    document.addEventListener('click', musicPlay);

    // El sitio inicia estrictamente silenciado por seguridad
    var audio = document.getElementById('youare-audio');
    var micon = document.getElementById('youare-micon');
    
    if (audio) {
        audio.muted = true;
        if (micon) {
            micon.src = "images/speakerm.png"; // Empieza con el icono tachado
            micon.style.width = "50px";        // ASEGURA EL TAMAÑO PEQUEÑO AL INICIAR
        }
    }
}

function musicPlay() {
    var audio = document.getElementById('youare-audio');
    var micon = document.getElementById('youare-micon');
    
    if (audio) {
        // SI YA ESTÁ SONANDO: Al hacer clic en cualquier lado, se pausa, se reinicia y se silencia
        if (!audio.muted && !audio.paused) {
            audio.pause();             
            audio.currentTime = 0;     
            audio.muted = true;        
            if (micon) {
                micon.src = "images/speakerm.png"; // Cambia al icono en silencio
                micon.style.width = "50px";        // Mantiene el tamaño en 50px
            }
        } 
        // SI ESTÁ EN SILENCIO: Al hacer clic en cualquier lado, se activa desde el principio
        else {
            audio.muted = false;
            audio.currentTime = 0;     
            audio.play().catch(function(error) {
                console.log("El navegador bloqueó la reproducción automática: ", error);
            });
            if (micon) {
                micon.src = "images/speaker.png";  // Cambia al icono con sonido activo
                micon.style.width = "50px";        // Mantiene el tamaño en 50px
            }
        }
    }
}

// Bucle secundario de respaldo para el archivo de audio manual
var faudio = new Audio('youare.mp3');
faudio.addEventListener('timeupdate', function() {
    if (this.currentTime > this.duration - .45) {
        this.currentTime = 0;
        this.play();
    }
});
