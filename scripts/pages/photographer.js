//Mettre le code JavaScript lié à la page photographer
// import { getPhotographers } from "./index.js";
// import { getMedias } from "./index.js";
// import {PageHeaderFactory} from "../factories/photographer.js";

// let params = new URLSearchParams(document.location.search);
// let photographerId = params.get("id"); // 


async function getPhotographers() {
  let photographers = await fetch("./data/photographers.json")
  .then((response) => response.json())
  .then((data) => {
    return data.photographers;
  });
// console.log(photographers)
return photographers;
}

let params = new URLSearchParams(document.location.search);
let urlId = params.get("id");

async function getPhotograph() {
  const response = await fetch("./data/photographers.json");
  if (!response.ok) {
    const message = `An error has occured with fetch: ${response.status}`;
    throw new Error(message);
  }
          const data = await response.json();
          let photographers = await data.photographers;
const photographerChoice = photographers.find((photograph) => photograph.id == urlId);
console.log(photographerChoice);
 return photographerChoice;
}

 async function getMedias() {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) {
      const message = `An error has occured with fetch: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
   const media = data.media;
  let photographerChoiceMedia = media.filter((media) => media.photographerId == urlId);
     console.log(photographerChoiceMedia)
    return photographerChoiceMedia;
}

const counterLikes = document.getElementById('counterLikes');

async function displayData(photographer,media) {
  

        //header photograph
      const contactbtn = document.querySelector('button');
      const photographerModel = PageHeaderFactory(photographer);
      const getUserHeaderDOM = photographerModel.getUserHeaderDOM();
      const imgPortrait = document.querySelector(".photograph-header > img")
      const header = document.querySelector(".photograph-header");
      imgPortrait.parentNode.insertBefore(contactbtn,imgPortrait);

      const boxmedia = document.getElementById('boxmedia');

      const TotalLikes = media.map(item => item.likes).reduce((prev, curr) => prev + curr, 0);

      const counterLikes = document.getElementById('counterLikes');
      //counterLikes.innerHTML = TotalLikes;
      console.log(counterLikes);

      const mediaLikes = PageMediaFactory(media);
      const TotalLikeArticle = mediaLikes.getTotalLikes(TotalLikes,photographer.price);
      boxmedia.appendChild(TotalLikeArticle);

      //box card media
      media.forEach((item) => {
        const mediaModel = PageMediaFactory(item,TotalLikes);
        const getMediaCardDOM = mediaModel.getMediaCardDOM()
        boxmedia.appendChild(getMediaCardDOM);
      })
  
    
      // A revoire
      

      // const likestitle = document.getElementsByClassName('likestitle');
      // console.log(likestitle)
   
      
      //Sum Likes Total
      // const newlikes = media.likes;
     
      // const btnLikes = document.getElementsByClassName( 'likestitle' );
      // console.log(btnLikes)
      // btnLikes.textContent = newlikes;

      // btnLikes.forEach((item) => {item.addEventListener('click', () => {
      //   const btnLikes = document.getElementsByClassName( 'likestitle' );
    

        //A finir modal contact 
        const h2 = document.querySelector("#contact_modal > h2");
        const modalModel = getModal(photographer);
        const getUserModalDOM = modalModel.getUserModalDOM();
        const name = document.querySelector("header > .name");

  }


async function initPage() {
    const photographer = await getPhotograph();
    const media = await getMedias();
    displayData(photographer,media);
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



function PageMediaFactory(data,total) {
  const {  id, photographerId, title, image, video, likes, price,date} = data;
  const imgHeart = `../assets/icons/heart`;
  const pictureVideo = `../assets/${photographerId}/${video}`;
  const pictureImg = `../assets/${photographerId}/${image}`;

  function getMediaCardDOM() {
     
      const article = document.createElement( 'article' );
      article.classList.add('card');
      const a = document.createElement('a');  
      a.href = `#`;
      article.appendChild(a);
      const divmedia = document.createElement('div'); 
      divmedia.classList.add('card_media');
      a.appendChild(divmedia);
        if (image) {
          const imgphoto = document.createElement( 'img' );
          imgphoto.classList.add('cardImg');
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
      btnLikes.classList.add('btnLikes');
      const btnLiketitle = document.createElement( 'span' );
      btnLiketitle.classList.add('likestitle');
      btnLiketitle.textContent = likes;

      const heart = document.createElement( 'img' );
      heart.setAttribute("src", `../assets/icons/heart.png`);
      heart.classList.add('heart');
      heart.alt = "likes";

      article.appendChild(divtext);
      divtext.appendChild(titlemedia);
      divtext.appendChild(btnLikes);
      btnLikes.appendChild(btnLiketitle);
      btnLikes.appendChild(heart);

      //increment partielLikes
      
      btnLikes.addEventListener('click', () => {                 
                  btnLiketitle.innerHTML = likes + 1;
                  const likestitle = document.getElementsByClassName('likestitle');
                  likestitle.innerHTML = likestitle.innerHTML + 1 ;
                })
      
      
      return (article);
    }

    function getTotalLikes(total,price) {

      const TotalLikessum = document.createElement( 'article' );
      const divlike = document.createElement( 'div' );
      TotalLikessum.classList.add('cardLikes');
      const TotalLiketitle = document.createElement( 'span' );
      TotalLiketitle.classList.add('totalLikesTitle');
      TotalLiketitle.textContent = total;
      const heart2 = document.createElement( 'img' );
      heart2.setAttribute("src", `../assets/icons/heartblack.png`);
      heart2.alt = "likes";
      const pricejour = document.createElement( 'span' );
      pricejour.textContent = `${price}€ / jour`;

      TotalLikessum.appendChild(divlike);
      divlike.appendChild(TotalLiketitle);
      divlike.appendChild(heart2);
      TotalLikessum.appendChild(pricejour);

      return (TotalLikessum);
    }


    function getsorting() {
      
    }

  return { date, id, image,video, likes, photographerId, price, title , getMediaCardDOM, getTotalLikes 
  }
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

// function ecoute(){
// const btnLikes = document.getElementsByClassName('btnLikes');
// btnLikes.forEach((item) => item.addEventListener('click', () => {
//           const likestitle = document.getElementsByClassName('likestitle');
//           likestitle.innerHTML = likes + 1;
//           const TotalLiketitle = document.getElementsByClassName('totalLikesTitle');
//            TotalLiketitle.innerHTML = total +1;
// }))}