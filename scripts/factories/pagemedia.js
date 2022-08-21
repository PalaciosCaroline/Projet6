import { updateTotalLikes } from '../data/data.js';
import { displayModal } from '../utils/contactForm.js';

export default function PageMediaFactory(photograph, data) {
  const pictureVideo = `../assets/${data.photographerId}/${data.video}`;
  const pictureImg = `../assets/${data.photographerId}/${data.image}`;
  const picture = `assets/photographers/photographers_ID_Photos/${photograph.portrait}`;
  function getUserHeaderDOM() {
    const header = document.querySelector('.photograph-header');
    const contactbtn = document.querySelector('.contact_button');
    const article = document.createElement('article');
    const h1 = document.createElement('h1');
    h1.textContent = photograph.name;
    const h2 = document.createElement('h2');
    h2.textContent = `${photograph.city}, ${photograph.country}`;
    const legende = document.createElement('p');
    legende.textContent = photograph.tagline;
    const divPortrait = document.createElement('div');
    divPortrait.classList.add('divPortrait');
    const imgChoisi = document.createElement('img');
    divPortrait.appendChild(imgChoisi);
    imgChoisi.setAttribute('src', picture);
    imgChoisi.alt = photograph.name;
    header.appendChild(article);
    // article.appendChild(divPortrait);
    article.appendChild(h1);
    article.appendChild(h2);
    article.appendChild(legende);
    header.appendChild(divPortrait);
    divPortrait.parentNode.insertBefore(contactbtn, divPortrait);
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
      imgphoto.alt = data.title;
      a.appendChild(imgphoto);
    } else if (data.video) {
      a.setAttribute('href', `../assets/${data.photographerId}/${data.video}`);
      const iconVideo = document.createElement('icon');
      divmedia.appendChild(iconVideo);
      iconVideo.className = 'fa-regular fa-circle-play iconVideo';
      const imgphoto = document.createElement('video');
      imgphoto.classList.add('cardImg');
      imgphoto.setAttribute('src', pictureVideo);
      // imgphoto.setAttribute('controls', 'false');
      a.appendChild(imgphoto);
    }
    const divtext = document.createElement('div');
    divtext.classList.add('card_text');
    const titlemedia = document.createElement('h3');
    titlemedia.textContent = data.title;
    titlemedia.ariaHidden = true;
    const btnLikes = document.createElement('button');
    btnLikes.classList.add('btnLikes');
    btnLikes.ariaLabel = `${data.likes}likes`;
    btnLikes.ariaDescription = 'donner un like à la photo';
    const btnLiketitle = document.createElement('span');
    btnLiketitle.classList.add('likestitle');
    btnLiketitle.textContent = data.likes;
    btnLiketitle.ariaHidden = 'likes';
    const heart = document.createElement('i');
    heart.className = 'far fa-heart heart';
    heart.ariaLabel = '';

    article.appendChild(divtext);
    divtext.appendChild(titlemedia);
    divtext.appendChild(btnLikes);
    btnLikes.appendChild(btnLiketitle);
    btnLikes.appendChild(heart);

    btnLikes.addEventListener('click', () => {
      if (btnLikes.dataset.liked !== 'true') {
        btnLiketitle.textContent = parseInt(btnLiketitle.textContent, 10) + 1;
        btnLikes.dataset.liked = true;
        heart.classList.remove('effectSmall');
        heart.className = 'fas fa-heart heart';
        heart.classList.add('effectBig');
        updateTotalLikes(+1);
      } else {
        btnLiketitle.textContent = parseInt(btnLiketitle.textContent, 10) - 1;
        heart.classList.remove('effectBig');
        heart.className = 'far fa-heart heart';
        heart.classList.add('effectSmall');
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
    const divlike = document.createElement('div')
    TotalLikessum.classList.add('cardLikes');
    const totalLiketitle = document.createElement('span');
    totalLiketitle.classList.add('totalLikesTitle');
    totalLiketitle.textContent = totallikes;
    const heart2 = document.createElement('img');
    heart2.setAttribute('src', '../assets/icons/heartblack.png');
    heart2.alt = 'likes';
    heart2.tabIndex = 0;
    heart2.ariaDescription = `${totallikes}likes, tarif du photographe${photograph.price}€ par jour`;
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
