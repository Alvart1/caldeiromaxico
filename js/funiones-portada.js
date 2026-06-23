const track = document.querySelector('.carrusel-track');
const btnPrev = document.getElementById('izquierda');
const btnNext = document.getElementById('derecha');

// El tamaño de desplazamiento por cada click (19.2% ancho + 1% gap)
const paso = 20.2; 

// Bandera para evitar que el usuario pulse super rápido y rompa la animación
let estaAnimando = false;

// Configuración inicial para asegurar transiciones suaves
track.style.transform = `translateX(0%)`;

btnNext.addEventListener('click', () => {
    if (estaAnimando) return;
    estaAnimando = true;

    // 1. Añadimos la transición para que se mueva suave
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${paso}%)`;

    // 2. Cuando termina de moverse, reestructuramos el HTML en secreto
    setTimeout(() => {
        track.style.transition = 'none'; // Desactivamos animación un momento
        
        // Tomamos el primer elemento y lo mandamos al final
        const primerElemento = track.firstElementChild;
        track.appendChild(primerElemento); 
        
        // Reseteamos la posición de la tira al punto inicial
        track.style.transform = `translateX(0%)`;
        
        estaAnimando = false;
    }, 500); // 500ms coincide con el tiempo de la transición CSS
});

btnPrev.addEventListener('click', () => {
    if (estaAnimando) return;
    estaAnimando = true;

    // Para ir hacia atrás, primero movemos el ÚLTIMO elemento al PRINCIPIO en secreto
    track.style.transition = 'none';
    const ultimoElemento = track.lastElementChild;
    track.insertBefore(ultimoElemento, track.firstElementChild);

    // Desplazamos la tira a la izquierda instantáneamente para compensar el cambio
    track.style.transform = `translateX(-${paso}%)`;

    // Forzamos al navegador a procesar el cambio visual antes de animar
    setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(0%)`;
    }, 10);

    setTimeout(() => {
        estaAnimando = false;
    }, 510);
});

document.getElementById("btn-info-1").innerHTML="Entrada gratuita";
document.getElementById("btn-info-2").innerHTML="Entrada socios: 10€<br/>Entrada no socios:20€";
document.addEventListener("DOMContentLoaded", () =>{
    const botones = document.querySelectorAll(".cosa");
    const tarjetas = document.querySelectorAll(".evento-lista");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            botones.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            const categoriaSeleccionada = boton.getAttribute("data-categoria");
            tarjetas.forEach(tarjeta => {
                if (categoriaSeleccionada === "todo") {
                    tarjeta.classList.remove("hidden");
                } else {
                    if (tarjeta.classList.contains(categoriaSeleccionada)){
                        tarjeta.classList.remove("hidden");
                    } else {
                        tarjeta.classList.add("hidden");
                    }
                }
            })
        })

    })
})