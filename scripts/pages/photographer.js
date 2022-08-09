//Mettre le code JavaScript lié à la page photographer
// import { getPhotographers } from "./index.js";
// import { getMedias } from "./index.js";
// import {PageHeaderFactory} from "../factories/photographer.js";

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
        // const photographerModel = PageMediaFactory(photographer,media);
        const mediaModel = PageMediaFactory(photographer,media);
        const getUserHeaderDOM = mediaModel.getUserHeaderDOM();

      const boxmedia = document.getElementById('boxmedia');

      const TotalLikes = media.map(item => item.likes).reduce((prev, curr) => prev + curr, 0);

      //box card media
      media.forEach((item) => {
        const mediaModelCard = PageMediaFactory(photographer,item);
        const getMediaCardDOM = mediaModelCard.getMediaCardDOM()
        boxmedia.appendChild(getMediaCardDOM);
      })

      //étiquette du bas de page avec le Total des likes et du tarif/jour du photograph
      const TotalLikeArticle = mediaModel.getTotalLikes();
      boxmedia.appendChild(TotalLikeArticle);

      const totalLikesTitle = document.getElementsByClassName('totalLikesTitle');

      //Nécessaire pour le Compteur console.log du total likes
      totalLikesTitle.textContent = TotalLikes;
      
      // A revoire
      // btnLikes.addEventListener('click', () => {                 
      //   btnLiketitle.innerHTML = likes + 1;
      //   const totalLikesTitle = document.getElementsByClassName('totalLikesTitle');
      //   totalLikesTitle.textContent = parseInt(totalLikesTitle.textContent) + 1 ;
      // })

      //A finir modal contact 
      const h2 = document.querySelector("#contact_modal > h2");
      const getUserModalDOM = mediaModel.getUserModalDOM();
      // const name = document.querySelector("header > .name");
}


async function initPage() {
    const photographer = await getPhotograph();
    const media = await getMedias();
    displayData(photographer,media);
}

getSelectMedia();
initPage();


function PageMediaFactory(photograph,data) {
  const imgHeart = `../assets/icons/heart`;
  const pictureVideo = `../assets/${data.photographerId}/${data.video}`;
  const pictureImg = `../assets/${data.photographerId}/${data.image}`;
  const picture = `assets/photographers/photographers_ID_Photos/${photograph.portrait}`;

  function getUserHeaderDOM() {
      const header = document.querySelector(".photograph-header");
      const contactbtn = document.querySelector('button');
      const article = document.createElement( 'article' );
      const h2 = document.createElement( 'h2' );
      h2.textContent = photograph.name;
      const h3 = document.createElement( 'h3' );
      h3.textContent = `${photograph.city}, ${photograph.country}`;
      const legende = document.createElement( 'p' );
      legende.textContent = photograph.tagline;
      const imgChoisi = document.createElement( 'img' );
      imgChoisi.setAttribute("src", picture);
      imgChoisi.alt = photograph.name;
      header.appendChild(article);
      article.appendChild(imgChoisi);
      article.appendChild(h2);
      article.appendChild(h3);
      article.appendChild(legende);
      header.appendChild(imgChoisi);
      imgChoisi.parentNode.insertBefore(contactbtn,imgChoisi);

      return (article);
    }

  function getMediaCardDOM() {
     
      const article = document.createElement( 'article' );
      article.classList.add('card');
      
      const divmedia = document.createElement('div'); 
      divmedia.classList.add('card_media');
      article.appendChild(divmedia);
        if (data.image) {
          const imgphoto = document.createElement( 'img' );
          imgphoto.classList.add('cardImg');
          imgphoto.setAttribute("src", pictureImg);
          imgphoto.alt = data.title;
          divmedia.appendChild(imgphoto);
          // return imgphoto;
          
      } else if (data.video) {
          const imgphoto = document.createElement( 'video' );
          imgphoto.classList.add('cardImg');
          imgphoto.setAttribute("src", pictureVideo);
          imgphoto.setAttribute("controls", true);
          imgphoto.controls = true;
          imgphoto.alt = data.title;
          divmedia.appendChild(imgphoto);
        // return videophoto;
      }
      const divtext = document.createElement('div'); 
      divtext.classList.add('card_text');
      const titlemedia = document.createElement( 'h2' );
      titlemedia.textContent = data.title;
      const btnLikes = document.createElement( 'button' );
      btnLikes.classList.add('btnLikes');
      const btnLiketitle = document.createElement( 'span' );
      btnLiketitle.classList.add('likestitle');
      btnLiketitle.textContent = data.likes;

      const heart = document.createElement( 'img' );
      heart.setAttribute("src", `../assets/icons/heart.png`);
      heart.classList.add('heart');
      heart.alt = "likes";

      article.appendChild(divtext);
      divtext.appendChild(titlemedia);
      divtext.appendChild(btnLikes);
      btnLikes.appendChild(btnLiketitle);
      btnLikes.appendChild(heart);
      

      //A refaire increment partielLikes
      const totalLikesTitle = document.getElementsByClassName('totalLikesTitle');
      btnLikes.addEventListener('click', () => { 
        console.log(totalLikesTitle);
        btnLiketitle.textContent = parseInt( btnLiketitle.textContent) + 1;
        totalLikesTitle.textContent = parseInt( totalLikesTitle.textContent) + 1;
      })

      return (article);
    }

    
    function getTotalLikes() {

      const totallikes = data.map(item => item.likes).reduce((prev, curr) => prev + curr, 0);

      const TotalLikessum = document.createElement( 'article' );
      const divlike = document.createElement( 'div' );
      TotalLikessum.classList.add('cardLikes');
      const totalLiketitle = document.createElement( 'span' );
      totalLiketitle.classList.add('totalLikesTitle');
      totalLiketitle.textContent = totallikes;
      const heart2 = document.createElement( 'img' );
      heart2.setAttribute("src", `../assets/icons/heartblack.png`);
      heart2.alt = "likes";
      const pricejour = document.createElement( 'span' );
      pricejour.textContent = `${photograph.price}€ / jour`;

      TotalLikessum.appendChild(divlike);
      divlike.appendChild(totalLiketitle);
      divlike.appendChild(heart2);
      TotalLikessum.appendChild(pricejour);

      return (TotalLikessum);
    }

    function getUserModalDOM() {
      const header = document.querySelector("#contact_modal > .modal > header");
      // const titre = document.querySelector("#contact_modal > header > h2");
      const h2 = document.createElement( 'h2' );
      h2.classList.add("name");
      h2.textContent = photograph.name;
      // header.appendChild(div);
      header.appendChild(h2);
      return (h2);
    }

  return {getUserHeaderDOM, getMediaCardDOM, getTotalLikes, getUserModalDOM }
}



//   function getModal(photograph) {
 

//   function getUserModalDOM() {
//         const header = document.querySelector("#contact_modal > .modal > header");
//         // const titre = document.querySelector("#contact_modal > header > h2");
//         const h2 = document.createElement( 'h2' );
//         h2.classList.add("name");
//         h2.textContent = photograph.name;
//         // header.appendChild(div);
//         header.appendChild(h2);
//         return (h2);
//     }
//   return { getUserModalDOM }
// }

// function incrementeLikes(){
// const btnLikes = document.querySelectorAll("btnLikes");
// const likestitle = document.querySelectorAll("likestitle");
//       console.log(btnLikes);
//       const totalLikesTitle = document.getElementsByClassName('totalLikesTitle');
//       for (let i = 0; i < btnLikes.length; i++) {
//         btnLikes[i].addEventListener("click", () => {
//           likestitle[i].textContent = parseInt(likestitle[i].textContent) + 1;
//           totalLikesTitle.textContent = parseInt( totalLikesTitle.textContent) + 1;
// })}};



function getSelectMedia() {

  const filterMedia = document.createElement( 'div' );
  document.body.appendChild(filterMedia);
  
  filterMedia.parentNode.insertBefore(boxmedia,filterMedia.nextSibling);
  
  filterMedia.innerHTML =  `
  <div class="sorting" aria-label="sélecteur de tri des medias">
        <h3>Trier par</h3>
        <div class="sorting_select">
          <form class="form_sorting">    
              <ul tabindex="0"  aria-label="Trier les photos">
                <li tabindex="0"  aria-label="popularité">
                  <i class="fas fa-chevron-up"></i>
                  <i class="fas fa-chevron-down"></i>
                  <input type="radio" id="popularite" value="popularity" name="sorting_option" title="popularite" checked>
                  <label for="popularite">Popularité</label>
                </li>
                <li tabindex="0" aria-label="date">
                  <input type="radio" id="date" value="date" name="sorting_option" title="date">
                  <label for="option2">Date</label>
                </li>
                <li tabindex="0" aria-label="titre">
                  <input type="radio" id="titre" value="titre" name="sorting_option" title="titre">
                  <label for="titre">Titre</label>
                </li>
              </ul>
          </form>
        </div>
      </div>`;
  
  }