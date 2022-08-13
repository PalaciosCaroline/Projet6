import {photographerUrlId, getData,getPhotographer, getMedias ,updateTotalLikes} from "../data/data.js";
import {getSelectMedia, sortingMedia} from "../utils/tagFiltrage.js";
import {Lightbox} from "../utils/lightbox.js";
import {getUserModalDOM, displayModal} from "../utils/contactForm.js";

const counterLikes = document.getElementById('counterLikes');

 //header photograph
export async function displayDataPageHeader(photographer, data) {
  // const photographerModel = PageMediaFactory(photographer,media);
  const mediaModel = PageMediaFactory(photographer, data);
  const getUserHeaderDOM = mediaModel.getUserHeaderDOM();
  //A finir modal contact
  const h2 = document.querySelector("#contact_modal > h2");
  getUserModalDOM(photographer);
  const formContact = document.getElementById('form_contact');
  formContact.addEventListener("submit", (event) => {
    event.preventDefault();
    
  }) 
}

export async function displayDataPageMedia(photographer,media) {
  const boxmedia = document.getElementById('boxmedia');
  const mediaModel = PageMediaFactory(photographer, media);
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
}

async function initPage() {
  // const photographer = await getPhotographer(photographerUrlId);
  // const media = await getMedias(photographerUrlId);
  const data = await getData();
  let photographer = getPhotographer(data,photographerUrlId);
  let media = getMedias(data,photographerUrlId);
 
  displayDataPageHeader(photographer,media);  
  getSelectMedia(photographer, media);

  //boxmedia with popularity default choice
  sortingMedia(photographer, media);
  //boxmedia if choice another selection
  const formSorting = document.querySelector('.form_sorting');
  formSorting.addEventListener('change', () => sortingMedia(photographer, media));

  Lightbox.initLightbox();
  
}

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

    contactbtn.addEventListener("click", displayModal);

    return (article);
  }

  function getMediaCardDOM() {
     
    const article = document.createElement('article');
    article.classList.add('card');
    
    const divmedia = document.createElement('div'); 
    divmedia.classList.add('card_media');
    article.appendChild(divmedia);

    if (data.image) {
      const a = document.createElement('a'); 
      divmedia.appendChild(a);
      a.rel="lightbox";
      a.id = data.id;
      a.title = data.title;
      a.setAttribute("href", `../assets/${data.photographerId}/${data.image}`);
      const imgphoto = document.createElement('img');
      imgphoto.classList.add('cardImg');
      imgphoto.setAttribute("src", pictureImg);
      a.dataLabel = data.id;
      a.appendChild(imgphoto);
      // return imgphoto;
        
    } else if (data.video) {
      const a = document.createElement('a'); 
      a.setAttribute("href", `../assets/${data.photographerId}/${data.video}`);
      divmedia.appendChild(a);
      a.title = data.title;
      a.id = data.id;
      // a.dataLabel = data.id;
      const imgphoto = document.createElement('video');
      imgphoto.classList.add('cardImg');
      imgphoto.setAttribute("src", pictureVideo);
      imgphoto.setAttribute("controls", true);
      imgphoto.controls = true;
      a.appendChild(imgphoto);
    // return videophoto;
    }
    const divtext = document.createElement('div'); 
    divtext.classList.add('card_text');
    const titlemedia = document.createElement('h2');
    titlemedia.textContent = data.title;
    const btnLikes = document.createElement('button');
    btnLikes.classList.add('btnLikes');
    btnLikes.setAttribute("aria-description", "bouton pour liker la photo");
    const btnLiketitle = document.createElement('span');
    btnLiketitle.classList.add('likestitle');
    btnLiketitle.textContent = data.likes;
    const heart = document.createElement( 'i' );
    heart.className = ('far fa-heart heart');
    heart.ariaHidden = true;

    article.appendChild(divtext);
    divtext.appendChild(titlemedia);
    divtext.appendChild(btnLikes);
    btnLikes.appendChild(btnLiketitle);
    btnLikes.appendChild(heart);
    
    btnLikes.addEventListener('click', () => { 
      if(btnLikes.dataset.liked !== 'true') {
        btnLiketitle.textContent = parseInt(btnLiketitle.textContent) + 1;
        btnLikes.dataset.liked = true;
        heart.className = ('fas fa-heart heart');
        updateTotalLikes(+1);

      } else {
        btnLiketitle.textContent = parseInt(btnLiketitle.textContent) - 1;
        heart.className = ('far fa-heart heart');
        btnLikes.dataset.liked = false;  
        updateTotalLikes(-1);
      }
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

  
  return {getUserHeaderDOM, getMediaCardDOM, getTotalLikes }
}

