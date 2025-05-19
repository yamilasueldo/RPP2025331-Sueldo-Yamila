export class Carta{
    constructor(id, url, nombre, precio) {
        this.id = id;
        this.urlScryFall = url;
        this.nombre = nombre;
        this.urlImagen = url;
        this.precio = precio;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static createFromJsonString(json) {
        const data = JSON.parse(json);
        return new Carta(
            data.id,
            data.urlScryFall,
            data.nombre,
            data.urlImagen,
            data.precio,
        );
    }

    createHtmlElement() {
        const cartaElement = document.createElement('div');
        cartaElement.className = 'carta-card';

        const nameElement = document.createElement('h3');
        nameElement.textContent = this.nombre;
        nameElement.className = 'carta-name';
        cartaElement.appendChild(nameElement);

       // const imageLink = document.createElement('a');
        //imageLink.href = this.url;
        //imageLink.target = '_blank'; 

        const imageElement = document.createElement('img');
        imageElement.src = this.urlImagen;
        imageElement.alt = this.nombre;
        imageElement.className = 'carta-image';

        cartaElement.appendChild(imageElement);
        //cartaElement.appendChild(imageLink);

        

        const precioElement = document.createElement('p');
        precioElement.textContent =`Precio: ${this.precio}`;
        precioElement.className = 'carta-language';
        cartaElement.appendChild(precioElement);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'guardar';
        saveButton.className = 'save-button';
        saveButton.addEventListener('click', () => {
            carta.guardarCarta(this);
        });
        cartaElement.appendChild(saveButton);

        return cartaElement;
    }

    static guardarcarta(carta) {
        let cartasGuardadas = localStorage.getItem('cartasGuardadas');
        
        if (cartasGuardadas) {
            cartasGuardadas = JSON.parse(cartasGuardadas);
            const yaExiste = cartasGuardadas.some(s => s.id === carta.id);
            
            if (!yaExiste) {
                cartasGuardadas.push(JSON.parse(carta.toJsonString()));
                localStorage.setItem('cartasGuardadas', JSON.stringify(cartasGuardadas));
                alert('carta guardada correctamente.');
            } else {
                alert('Esta carta ya está guardada.');
            }
        } else {
            const cartaJSON = carta.toJsonString();
            localStorage.setItem('cartasGuardadas', JSON.stringify([JSON.parse(cartaJSON)]));
            alert('carta guardada correctamente.');
        }
    }
}
