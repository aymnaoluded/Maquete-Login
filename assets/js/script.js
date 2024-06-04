import {comics} from './libros.js'

const enviarDatos = (serie,id,name,publicaion,escritor,descripcion,sprite1,precio )=>{

    const rutaArchivoHTML = "../libros.html";
    fetch(rutaArchivoHTML)
    .then( response => response.text())
    .then((html)=>{

        const parser = new DOMParser();

        const doc = parser.parseFromString(html,"text/html")

        const imagePage = doc.getElementById("imagePage")
        imagePage.src = sprite1;
        imagePage.alt = `Foto con nombre de : ${name}`

        const namePage = doc.getElementById("namePage")
        namePage.textContent = ` ${name}`

        const escritorPage = doc.getElementById("escritorPage")
        escritorPage.textContent = `Escritor: ${escritor}`

        const publicacionPage = doc.getElementById("publicaionPage")
        publicacionPage.textContent = `Publicacion: ${publicaion}`

        const descripcionPage = doc.getElementById("descripcionPage")
        descripcionPage.textContent=`${descripcion}`

        const precioPage=doc.getElementById("precioPage")
        precioPage.textContent=`Precio: ${precio}`


        const nuevoHTML = new XMLSerializer().serializeToString(doc);

        document.body.innerHTML = nuevoHTML;

    })



}

const cardContainer = document.getElementById('card-container');
const {serie,id,name,publicaion,escritor,descripcion,sprite1,precio =""} = comics;


const createComicCard = (comic) => {
  const { id, name, escritor, precio, publicaion, descripcion, sprite1 } = comic;

  const card = document.createElement("div");
  card.classList.add("col", "col-xl-4", "col-lg-4", "col-md-6", "col-xs-12", "col-sm-12", "mt-5", "mb-5");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.setAttribute("src", sprite1);
  img.setAttribute("alt", name);

  cardInner.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "text-center");

  const title = document.createElement("h3");
  title.classList.add("card-title", "mt-3");
  title.textContent = name;

  const escritorN = document.createElement("p");
  escritorN.classList.add("card-text");
  escritorN.textContent = `Escritor: ${escritor}`;

  const publicaionN = document.createElement("p");
  publicaionN.classList.add("card-text");
  publicaionN.textContent = `Publicación: ${publicaion}`;

  const descripcionN = document.createElement("p");
  descripcionN.classList.add("card-text");
  descripcionN.textContent = `Descripción: ${descripcion}`;

  const precioInfo = document.createElement("h5");
  precioInfo.classList.add("card-text", "mb-4");
  precioInfo.textContent = `Precio: ${precio}`;

  const botonVer = document.createElement("button")
  botonVer.classList.add("btn" , "btn-success","mx-5","mb-3")
  botonVer.textContent="Ver detalles"
  botonVer.addEventListener("click" , () =>{
    enviarDatos(serie,id,name,publicaion,escritor,descripcion,sprite1,precio)
  })

  const botonCar = document.createElement("button");
  botonCar.classList.add("btn", "btn-success", "add-cart");
  botonCar.textContent = "Añadir al carrito";
  botonCar.addEventListener("click", () => {
      addToCart(comic);
  });

  cardBody.appendChild(title);
  cardBody.appendChild(escritorN);
  cardBody.appendChild(precioInfo); 
  cardBody.appendChild(botonVer);
  cardBody.appendChild(botonCar);

  cardInner.appendChild(cardBody);
  card.appendChild(cardInner);

  return card;
};

// Inicializar las tarjetas de cómics
const getComics = (comics) => {
  const cardContainer = document.getElementById("card-container");
  const comicCards = comics.map(createComicCard);
  comicCards.forEach((card) => {
      cardContainer.appendChild(card);
  });
};

// Función para añadir al carrito
const addToCart = (comics) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(comics);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Cómic añadido al carrito');
};

// Inicializar las cartas de cómics
document.addEventListener("DOMContentLoaded", function() {
  getComics(comics);
});