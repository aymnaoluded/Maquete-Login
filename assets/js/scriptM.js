// Llamar a la api
const obtenerLibrosAsyncAwait = async () => {
    try {
        const response = await fetch('https://api-comics-5bfe.onrender.com');
        
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos de cómics');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en obtenerLibrosAsyncAwait:', error);
        throw error;
    }
};

(async function() {
    try {
        const data = await obtenerLibrosAsyncAwait();
        console.log('Datos obtenidos con éxito:', data);
    } catch (error) {
        console.log('Error al obtener los datos de cómics', error);
    }
})();

// Mostrar datos de comics en libros.html
const enviarDatos = (serie, id, name, publicaion, escritor, descripcion, sprite1, precio) => {
    const rutaArchivoHTML = "../TodosMangas.html";
    fetch(rutaArchivoHTML)
        .then(response => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const imagePage = doc.getElementById("imagePage");
            imagePage.src = sprite1;
            imagePage.alt = `Foto con nombre de: ${name}`;

            const namePage = doc.getElementById("namePage");
            namePage.textContent = `${name}`;

            const escritorPage = doc.getElementById("escritorPage");
            escritorPage.textContent = `Escritor: ${escritor}`;

            const publicacionPage = doc.getElementById("publicaionPage");
            publicacionPage.textContent = `Publicacion: ${publicaion}`;

            const descripcionPage = doc.getElementById("descripcionPage");
            descripcionPage.textContent = `${descripcion}`;

            const precioPage = doc.getElementById("precioPage");
            precioPage.textContent = `Precio: ${precio}`;

            const nuevoHTML = new XMLSerializer().serializeToString(doc);
            document.body.innerHTML = nuevoHTML;
        });
};

//Crear cartas para mostrar los libros
const mostrarLibro = async () => {
    const cardContainer = document.getElementById('card-container');
    if (!cardContainer) {
        console.error('Contenedor de tarjetas no encontrado');
        return;
    }

    try {
        const data = await obtenerLibrosAsyncAwait();
        const libros = data.libros;  // Extraer la propiedad `libros` del objeto devuelto
        
        // Verifica que `libros` esté definido y sea un array
        if (!Array.isArray(libros)) {
            console.error('Estructura de datos inesperada');
            return;
        }

        libros.forEach(libro => {
            // Asegúrate de que cada libro tenga una propiedad `serie`
            if (libro.serie === "Manga") {
                const cardCol = document.createElement("div");
                cardCol.classList.add("col", "col-xl-4", "col-lg-4", "col-md-6", "col-xs-12", "col-sm-12");

                const card = document.createElement("div");
                card.classList.add("card", "mt-4", "mb-4");

                const cardImg = document.createElement("img");
                cardImg.classList.add("card-img-top");
                cardImg.src = libro.sprite1;

                const cardBody = document.createElement("div");
                cardBody.classList.add("card-body");

                const cardTitle = document.createElement("h3");
                cardTitle.classList.add("card-title");
                cardTitle.textContent = libro.name;

                const escritorN = document.createElement("p");
                escritorN.classList.add("card-text");
                escritorN.textContent = `Escritor: ${libro.escritor}`;

                const precioInfo = document.createElement("h5");
                precioInfo.classList.add("card-text", "mb-4");
                precioInfo.textContent = `Precio: ${libro.precio}`;

                const botonVer = document.createElement("button");
                botonVer.classList.add("btn", "btn-success", "mx-5", "mb-3");
                botonVer.textContent = "Ver detalles";
                botonVer.addEventListener("click", () => {
                    enviarDatos(libro.serie, libro.id, libro.name, libro.publicaion, libro.escritor, libro.descripcion, libro.sprite1, libro.precio);
                });

                const botonCar = document.createElement("button");
                botonCar.classList.add("btn", "btn-success", "add-cart");
                botonCar.textContent = "Añadir al carrito";
                botonCar.addEventListener("click", () => {
                    addToCart(libro); // Ajustado para pasar `libro` en lugar de `libros`
                });

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(escritorN);
                cardBody.appendChild(precioInfo);
                cardBody.appendChild(botonVer);
                cardBody.appendChild(botonCar);
                card.appendChild(cardImg);
                card.appendChild(cardBody);
                cardCol.appendChild(card);
                cardContainer.appendChild(cardCol);
            } else {
                console.log("Serie no Encontrada");
            }
        });
    } catch (error) {
        console.error("Error al obtener datos de cómics:", error);
    }
};

document.addEventListener("DOMContentLoaded", mostrarLibro);

const addToCart = (libro) => {
    let carro = JSON.parse(localStorage.getItem('carro')) || [];
    carro.push(libro); // Ajustado para almacenar un libro individual en el carrito
    localStorage.setItem('carro', JSON.stringify(carro));
    alert('Cómic añadido al carrito');
};
