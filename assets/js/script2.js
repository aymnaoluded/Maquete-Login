import {mangas} from './libros.js'

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
const {serie,id,name,publicaion,escritor,descripcion,sprite1,precio =""} = mangas;


const createComicCard = (mangas)=>{
  const {name , escritor , precio , publicaion,descripcion ,sprite1 } = mangas;

  const card = document.createElement("div");
  card.classList.add("col", "col-xl-4","col-lg-4","col-md-6", "col-xs-12", "col-sm-12" ,"mt-5" ,"mb-5");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.setAttribute("src", sprite1)
  img.setAttribute("alt" , name)

  cardInner.appendChild(img)

  const cardBody = document.createElement("div"); 
  cardBody.classList.add("card-title", "text-center");
  
  const title = document.createElement("h3");
  title.classList.add("card-title" , "mt-3");
  title.textContent=name;

  const escritorN = document.createElement("p");
  escritorN.classList.add("card-text");
  escritorN.textContent = `Escritor : ${escritor}`;

  const publicaionN = document.createElement("p");
  publicaionN.classList.add("card-text");
  publicaionN.textContent = `Publicacion : ${publicaion}`;

  const descripcionN = document.createElement("p");
  descripcionN.classList.add("card-text");
  descripcionN.textContent = `Descripcion : ${descripcion}`;

  const precioInfo = document.createElement("h5");
  precioInfo.classList.add("card-text" , "mb-4");
  precioInfo.textContent = `Precio : ${precio}`;


  const botonVer = document.createElement("button")
  botonVer.classList.add("btn" , "btn-success")
  botonVer.textContent="Ver detalles"
  botonVer.addEventListener("click" , () =>{
    enviarDatos(serie,id,name,publicaion,escritor,descripcion,sprite1,precio)
  })


  cardBody.appendChild(title);
  cardBody.appendChild(escritorN);
  cardBody.appendChild(precioInfo);
  cardBody.appendChild(botonVer);



  cardInner.appendChild(cardBody)
  card.appendChild(cardInner);

  return card; 



}


const getMangas = (mangas)=>{
  const mangaCards = mangas.map(createComicCard);
    mangaCards.forEach ((card)=>{
      cardContainer.appendChild(card);
  });
}

getMangas(mangas);