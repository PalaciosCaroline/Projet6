//Mettre le code JavaScript lié à la page photographer
// import { getPhotographers } from "./index.js";
// import { getMedias } from "./index.js";
// import {PageHeaderFactory} from "../factories/photographer.js";

let params = new URLSearchParams(document.location.search);
let photographerId = params.get("id"); // 

// photographerChoice est undefined (n'arrive pas à utiliser photographers)
// const photographerChoice = photographers.find((photographer) => photographer.id === photographerId);


async function getPhotographers() {

    const response = await fetch("./data/photographers.json");
       const data = await response.json();
      const photographers = data.photographers;
        // .catch((error) =>
        //      console.log('Il y a eu un problème avec l\'opération fetch'));

        // const photographerChoice = photographers.find((photographer) => photographer.id === photographerId);
        console.log(photographers);
   return photographers;
}

 async function getMedias() {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
   const media = data.media;
   let photographerChoiceMedia = media.filter((media) => media.photographerId === photographerId);
     // .catch((error) =>
     //      console.log('Il y a eu un problème avec l\'opération fetch'));
    return photographerChoiceMedia;
}


// async function displayData(photographerChoice) {
//     const photographersHeader = document.querySelector(".photograph-header");
//         const photographerModel = PageHeaderFactory(photographerChoice);
//         const userHeaderDOM = photographerModel.getUserCardDOM();
//         photographersHeader.appendChild(userHeaderDOM);
// };



async function initPage() {
    const photographers = await getPhotographers();
    const media = await getMedias();
    // const photographerChoice = photographers.find((photographer) => photographer.id === photographerId);
  
  
    // displayData(photographerChoice);
   
}

initPage();

