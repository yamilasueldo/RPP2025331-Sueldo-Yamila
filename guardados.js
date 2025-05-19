import { Carta } from './Carta.js'

const cartasContainer = document.getElementById('cartas');
let cartasGuardadas = JSON.parse(localStorage.getItem('cartasGuardadas'));
cartasGuardadas.forEach(datos => {
    const id = datos.id;
    const url = datos.url;
    const name = datos.name;
    const language = datos.language;
    const genres = datos.genres || [];
    const image = datos.image;

    const carta = new Carta(id, url, name, language, genres, image);

    const cartaElement = carta.createHtmlElement();
    cartasContainer.appendChild(cartaElement);
});

function ordenarPorNombre() {
    cartasGuardadas.sort((a, b) => a.name.localeCompare(b.name));
    actualizarVista();
}

function orderPorId() {
    cartasGuardadas.sort((a, b) => a.id - b.id);
    actualizarVista();
}

function actualizarVista() {
    cartasContainer.innerHTML = '';
    cartasGuardadas.forEach(datos => {
        const { id, url, name, language, genres = [], image } = datos;
        const carta = new carta(id, url, name, language, genres, image);
        const cartaElement = carta.createHtmlElement();
        cartasContainer.appendChild(cartaElement);
    });
}


document.getElementById('sort-name').addEventListener('click', ordenarPorNombre);
document.getElementById('sort-id').addEventListener('click', orderPorId);