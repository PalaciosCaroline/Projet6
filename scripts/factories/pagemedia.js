import { updateTotalLikes } from '../data/data.js';
import { displayModal } from '../utils/contactForm.js';

export default function PageMediaFactory(photograph, data) {
  const pictureVideo = `../assets/${data.photographerId}/${data.video}`;
  const pictureImg = `../assets/${data.photographerId}/${data.image}`;
  const picture = `assets/photographers/photographers_ID_Photos/${photograph.portrait}`;
  function getUserHeaderDOM() {
    const header = document.querySelector('.photograph-header');
    const contactbtn = document.querySelector('button');
    const article = document.createElement('article');
    const h2 = document.createElement('h1');
    h2.textContent = photograph.name;
    const h3 = document.createElement('h2');
    h3.textContent = `${photograph.city}, ${photograph.country}`;
    const legende = document.createElement('p');
    legende.textContent = photograph.tagline;
    const imgChoisi = document.createElement('img');
    imgChoisi.setAttribute('src', picture);
    imgChoisi.alt = photograph.name;
    header.appendChild(article);
    article.appendChild(imgChoisi);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(legende);
    header.appendChild(imgChoisi);
    imgChoisi.parentNode.insertBefore(contactbtn, imgChoisi);
    contactbtn.addEventListener('click', displayModal);
    return article;
  }
  function getMediaCardDOM() {
    const article = document.createElement('article');
    article.classList.add('card');
    const divmedia = document.createElement('div');
    divmedia.classList.add('card_media');
    article.appendChild(divmedia);
    const a = document.createElement('a');
    divmedia.appendChild(a);
    a.rel = 'lightbox';
    a.ariaLabel = `${data.title}, closeup view`;
    a.title = data.title;
    if (data.image) {
      a.setAttribute('href', `../assets/${data.photographerId}/${data.image}`);
      const imgphoto = document.createElement('img');
      imgphoto.classList.add('cardImg');
      imgphoto.setAttribute('src', pictureImg);
      a.appendChild(imgphoto);
    } else if (data.video) {
      a.setAttribute('href', `../assets/${data.photographerId}/${data.video}`);
      const imgphoto = document.createElement('video');
      imgphoto.classList.add('cardImg');
      imgphoto.setAttribute('src', pictureVideo);
      imgphoto.setAttribute('controls', true);
      a.appendChild(imgphoto);
    }
    const divtext = document.createElement('div');
    divtext.classList.add('card_text');
    const titlemedia = document.createElement('h2');
    titlemedia.textContent = data.title;
    const btnLikes = document.createElement('button');
    btnLikes.classList.add('btnLikes');
    btnLikes.setAttribute('aria-description', 'bouton pour liker la photo');
    const btnLiketitle = document.createElement('span');
    btnLiketitle.classList.add('likestitle');
    btnLiketitle.textContent = data.likes;
    btnLiketitle.ariaLabel = 'nombre de likes';
    const heart = document.createElement('i');
    heart.className = 'far fa-heart heart';
    heart.ariaLabel = 'likes';

    article.appendChild(divtext);
    divtext.appendChild(titlemedia);
    divtext.appendChild(btnLikes);
    btnLikes.appendChild(btnLiketitle);
    btnLikes.appendChild(heart);

    btnLikes.addEventListener('click', () => {
      if (btnLikes.dataset.liked !== 'true') {
        btnLiketitle.textContent = parseInt(btnLiketitle.textContent, 10) + 1;
        btnLikes.dataset.liked = true;
        heart.className = 'fas fa-heart heart';
        updateTotalLikes(+1);
      } else {
        btnLiketitle.textContent = parseInt(btnLiketitle.textContent, 10) - 1;
        heart.className = 'far fa-heart heart';
        btnLikes.dataset.liked = false;
        updateTotalLikes(-1);
      }
    });
    return article;
  }

  function getTotalLikes() {
    const totallikes = data
      .map((item) => item.likes)
      .reduce((prev, curr) => prev + curr, 0);
    const TotalLikessum = document.createElement('article');
    const divlike = document.createElement('div');
    TotalLikessum.classList.add('cardLikes');
    const totalLiketitle = document.createElement('span');
    totalLiketitle.classList.add('totalLikesTitle');
    totalLiketitle.textContent = totallikes;
    const heart2 = document.createElement('img');
    heart2.setAttribute('src', '../assets/icons/heartblack.png');
    heart2.alt = 'likes';
    const pricejour = document.createElement('span');
    pricejour.textContent = `${photograph.price}€ / jour`;
    TotalLikessum.appendChild(divlike);
    divlike.appendChild(totalLiketitle);
    divlike.appendChild(heart2);
    TotalLikessum.appendChild(pricejour);
    return TotalLikessum;
  }
  return { getUserHeaderDOM, getMediaCardDOM, getTotalLikes };
}
