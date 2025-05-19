import { Carta } from './Carta.js'

const cartasPorPagina = 6;
let paginaActual = 1;

async function cargarCartas(pagina) {
    const cartasContainer = document.getElementById('cartas');
    cartasContainer.innerHTML = '';

    try {
        const idInicial = (pagina - 1) * cartasPorPagina + 1;
        const promesas = [];

        for (let i = 0; i < cartasPorPagina; i++) {
            const id = idInicial + i;
            promesas.push(
                fetch(`https://api.allorigins.win/raw?url=https://examenesutn.vercel.app/api/cartas/${id}`)
                .then(res => {
                    return res.json();
                }));
        }

        const resultados = await Promise.all(promesas);

        resultados.forEach(datos => {
            const id = datos.id;
            const urlScryFall = datos.urlScryFall;
            const nombre = datos.nombre;
            const urlImagen = datos.urlImagen;
            const precio = datos.precio;

            const carta = new Carta(id, urlScryFall, nombre, urlImagen, precio);

            const cartaElement = carta.createHtmlElement();
            cartasContainer.appendChild(cartaElement);
        });

    } catch (error) {
        console.error('Error al cargar las cartas:', error);
        cartasContainer.innerHTML = '<p>Error al cargar las cartas. Por favor, intenta nuevamente.</p>';
    }
}

function paginaSiguiente() {
    paginaActual++;
    cargarCartas(paginaActual);
}


function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        cargarCartas(paginaActual);
    }
}

document.getElementById('siguiente').addEventListener('click', paginaSiguiente);
document.getElementById('anterior').addEventListener('click', paginaAnterior);

document.addEventListener('DOMContentLoaded', () => {
    cargarCartas(paginaActual);
});
