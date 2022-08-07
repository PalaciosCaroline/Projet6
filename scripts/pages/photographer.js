//Mettre le code JavaScript lié à la page photographer
// import { getPhotographers } from "./index.js";
// import { getMedias } from "./index.js";
// import {PageHeaderFactory} from "../factories/photographer.js";

// let params = new URLSearchParams(document.location.search);
// let photographerId = params.get("id"); // 

// photographerChoice est undefined (n'arrive pas à utiliser photographers)
// const photographerChoice = photographers.find((photographer) => photographer.id === photographerId);


async function getPhotographers() {
  let photographers = await fetch("./data/photographers.json")
  .then((response) => response.json())
  .then((data) => {
    return data.photographers;
  });
// console.log(photographers)
return photographers;
}

// async function getPhotographers() {
//     const response = await fetch("./data/photographers.json");
//        const data = await response.json();
//       const photographers = data.photographers;
// 
//       console.log(photographers);
//    return photographers;
// }

let params = new URLSearchParams(document.location.search);
let urlId = params.get("id");

//A faire mettre en place le try
 //  avec    console.log('Il y a eu un problème avec l\'opération fetch'));
async function getPhotograph() {
  const response = await fetch("./data/photographers.json");
          const data = await response.json();
          let photographers = await data.photographers;
const photographerChoice = photographers.find((photograph) => photograph.id == urlId);
console.log(photographerChoice);
 return photographerChoice;
}

//A faire mettre en place le try
 async function getMedias() {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
   const media = data.media;
  let photographerChoiceMedia = media.filter((media) => media.photographerId == urlId);
     //      console.log('Il y a eu un problème avec l\'opération fetch'));
     console.log(photographerChoiceMedia)
    return photographerChoiceMedia;
}


async function displayData(photographer,media) {

      //header photograph
      const contactbtn = document.querySelector('button');
      const photographerModel = PageHeaderFactory(photographer);
      const getUserHeaderDOM = photographerModel.getUserHeaderDOM();
      const imgPortrait = document.querySelector(".photograph-header > img")
      const header = document.querySelector(".photograph-header");
      imgPortrait.parentNode.insertBefore(contactbtn,imgPortrait);

      //modal contact
      const h2 = document.querySelector("#contact_modal > h2");
      const modalModel = getModal(photographer);
      const getUserModalDOM = modalModel.getUserModalDOM();
      const name = document.querySelector("header > .name")

      //box card media
      const boxmedia = document.getElementById( 'boxmedia' );
      media.forEach((item) => {
      const mediaModel = PageMediaFactory(item);
      const getMediaCardDOM = mediaModel.getMediaCardDOM()
      boxmedia.appendChild(getMediaCardDOM);})

  }


async function initPage() {
    const photographer = await getPhotograph();
    const media = await getMedias();
    displayData(photographer,media);
  // console.log(photographerChoice)
}

initPage();


function PageHeaderFactory(photograph) {
  const { id, name, portrait, city, country, tagline, price } = photograph;
  const picture = `assets/photographers/photographers_ID_Photos/${portrait}`;

  function getUserHeaderDOM() {
      const header = document.querySelector(".photograph-header");
      const article = document.createElement( 'article' );
      const h2 = document.createElement( 'h2' );
      h2.textContent = name;
      const h3 = document.createElement( 'h3' );
      h3.textContent = `${city}, ${country}`;
      const legende = document.createElement( 'p' );
      legende.textContent = tagline;
      const imgChoisi = document.createElement( 'img' );
      imgChoisi.setAttribute("src", picture);
      imgChoisi.alt = name;
      header.appendChild(article);
      article.appendChild(imgChoisi);
      article.appendChild(h2);
      article.appendChild(h3);
      article.appendChild(legende);
      header.appendChild(imgChoisi);
      
      return (article);
  }
  return { name, city, country, tagline, getUserHeaderDOM }
}


function getModal(photograph) {
  const { id, name, portrait, city, country, tagline, price } = photograph;

  function getUserModalDOM() {
        const header = document.querySelector("#contact_modal > .modal > header");
        // const titre = document.querySelector("#contact_modal > header > h2");
        const h2 = document.createElement( 'h2' );
        h2.classList.add("name");
        h2.textContent = name;
        // header.appendChild(div);
        header.appendChild(h2);
        return (h2);
    }
  return { name, city, country, tagline, getUserModalDOM }
}



function PageMediaFactory(data) {
  const {  id, photographerId, title, image, video, likes, price,date} = data;
  const imgHeart = `../assets/icons/heart`;
  const pictureVideo = `../assets/${photographerId}/${video}`;
  const pictureImg = `../assets/${photographerId}/${image}`;

  function getMediaCardDOM() {
     
      const article = document.createElement( 'article' );
      const a = document.createElement('a');  
      a.href = `#`;
      article.appendChild(a);
      const divmedia = document.createElement('div'); 
      divmedia.classList.add('card_media');
      a.appendChild(divmedia);
        if (image) {
          const imgphoto = document.createElement( 'img' );
          imgphoto.setAttribute("src", pictureImg);
          imgphoto.alt = title;
          divmedia.appendChild(imgphoto);
          // return imgphoto;
          
      } else if (video) {
          const videophoto = document.createElement( 'video' );
          videophoto.setAttribute("src", pictureVideo);
          videophoto.setAttribute("controls", true);
          videophoto.controls = true;
          videophoto.alt = title;
          divmedia.appendChild(videophoto);
        // return videophoto;
      }
      const divtext = document.createElement('div'); 
      divtext.classList.add('card_text');
      const titlemedia = document.createElement( 'h2' );
      titlemedia.textContent = title;
      const btnLikes = document.createElement( 'button' );
      const btnLiketitle = document.createElement( 'span' );
      btnLiketitle.textContent = likes;
      const heart = document.createElement( 'img' );
      heart.setAttribute("src", `../assets/icons/heart.png`);
      heart.alt = "likes";

      article.appendChild(divtext);
      divtext.appendChild(titlemedia);
      divtext.appendChild(btnLikes);
      btnLikes.appendChild(btnLiketitle);
      btnLikes.appendChild(heart);
      return (article);
  }
  return { date, id, image,video, likes, photographerId, price, title , getMediaCardDOM }
}



       