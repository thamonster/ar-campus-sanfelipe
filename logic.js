document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const overlay = document.getElementById('overlay');
    const model = document.getElementById('scanned-model');
    const flickerLight = document.getElementById('flicker-light');

    // 1. CONFIGURACIÓN DE ESCALA (Aquí arreglamos el tamaño)
    // Si el modelo se ve chico, aumenta este número (ej: 5, 10, 50).
    // Si se ve muy grande, redúcelo (ej: 0.5).
    // Al poner 10, forzamos que el pasillo sea enorme y tú estés DENTRO.
    const MODEL_SCALE = 10; 
    
    model.setAttribute('scale', `${MODEL_SCALE} ${MODEL_SCALE} ${MODEL_SCALE}`);

    // 2. FUNCIÓN PARA PEDIR PERMISOS DE GIROSCOPIO (iOS 13+ y Android modernos)
    const requestMotionPermission = async () => {
        // Ocultar pantalla de carga
        overlay.style.display = 'none';

        // Lógica específica para iOS (iPhone requiere permiso explícito)
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permissionState = await DeviceOrientationEvent.requestPermission();
                if (permissionState === 'granted') {
                    // Permiso concedido, el giroscopio funcionará
                    console.log("Sensores activados correctamente");
                } else {
                    alert("Se denegó el permiso de orientación. La experiencia no funcionará bien.");
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            // Android y otros no suelen requerir requestPermission, funcionan directo
            console.log("Detectado dispositivo no-iOS, intentando activar sensores directo.");
        }
    };

    // 3. ACTIVAR AL HACER CLIC
    startBtn.addEventListener('click', requestMotionPermission);

    // 4. EFECTO DE LUZ PARPADEANTE (Terror)
    // Código simple para hacer que la luz roja falle aleatoriamente
    setInterval(() => {
        const randomIntensity = Math.random() * 2 + 0.5; // Entre 0.5 y 2.5
        flickerLight.setAttribute('intensity', randomIntensity);
        
        // A veces apagarla completamente por un instante
        if (Math.random() > 0.9) {
            flickerLight.setAttribute('intensity', 0);
        }
    }, 100); // Se ejecuta cada 100ms
});
