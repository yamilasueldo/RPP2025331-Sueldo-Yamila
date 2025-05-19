import { Carta } from './Carta.js'

const cartasContainer = document.getElementById('cartas');
let cartasGuardadas = JSON.parse(localStorage.getItem('cartasGuardadas'));
cartasGuardadas.forEach(datos => {
    const id = datos.id;
    const urlScryFall = datos.urlScryFall;
    const nombre = datos.nombre;
    const urlImagen = datos.urlImagen;
    const precio = datos.precio;
    
    const carta = new Carta(id, urlScryFall, nombre, urlImagen, precio);

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
        const { id, urlScryFall, nombre, urlImagen, precio } = datos;
        const carta = new carta(id, urlScryFall , nombre, urlImagen, precio);
        const cartaElement = carta.createHtmlElement();
        cartasContainer.appendChild(cartaElement);
    });
}


document.getElementById('sort-name').addEventListener('click', ordenarPorNombre);
document.getElementById('sort-id').addEventListener('click', orderPorId);