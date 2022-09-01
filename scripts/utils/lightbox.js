import { enableBodyScroll, disableBodyScroll } from './body_scroll_lock.js';
/*
 *@property {HTMLElement} element
 *@property {string[]} gallery path to media of ligthbox
 *@property {string[]} titles of media in ligthbox
 *@property {string} url  URL of the media display
 */
export default class Lightbox {
  static initLightbox() {
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
    const gallery = links.map((link) => link.getAttribute('href'));
    const titles = links.map((link) => link.getAttribute('title'));
    links.forEach((link) => link.addEventListener('click', (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-new
      new Lightbox(e.currentTarget.getAttribute('href'), e.currentTarget.getAttribute('title'), gallery, titles);
    }));
  }

  /*
   *@param {string} url  URL of media
   *@return {string[]} gallery path to media of ligthbox
   */
  constructor(url, title, gallery, titles) {
    this.element = this.buildDOM(title);
    this.loadImage(url, title);
    this.gallery = gallery;
    this.titles = titles;
    this.onKeyup = this.onKeyup.bind(this);
    document.body.appendChild(this.element);
    disableBodyScroll(this.element);
    document.addEventListener('keyup', this.onKeyup);
  }

  loadImage(url, title) {
    this.url = url;
    this.title = title;
    const h3Title = this.title.split('.')[0];
    const description = this.title.split('.')[1];
    const boxMedia = this.element.querySelector('.box_media_lightbox');
    const h3 = this.element.querySelector('h3');
    boxMedia.innerHTML = '';
    h3.innerHTML = '';
    if (url.includes('jpg')) {
      const image = new Image();
      boxMedia.appendChild(image);
      image.classList.add('media');
      image.alt = h3Title + description;
      image.src = url;
      image.tabIndex = 1;
      image.focus();
    } else if (url.includes('mp4')) {
      const video = document.createElement('video');
      boxMedia.appendChild(video);
      video.classList.add('media');
      video.setAttribute('controls', true);
      video.setAttribute('autoplay', true);
      video.classList.add('videomedia');
      video.src = url;
      video.title = h3Title + description;
      video.tabIndex = 1;
      video.focus();
    }
    h3.textContent = h3Title;
  }

  /* close the lightbox
   *@param {Mouseevent|keyBoardEvent} e
   */
  close(e) {
    e.preventDefault();
    const allimgs = document.querySelectorAll('img, video');
    const selectedImage = Array.from(allimgs).find((elt) => elt.src.includes(this.url.split('../')[1]));
    selectedImage.closest('a').focus();
    this.element.classList.add('hidden');
    enableBodyScroll(this.element);
    this.element.remove();
    document.removeEventListener('keyup', this.onKeyup);
  }

  /* go to the next
   *@param {Mouseevent|keyBoardEvent} e
   */
  next(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((image) => image === this.url);
    if (i === this.gallery.length - 1) {
      i = -1;
    }
    this.loadImage(this.gallery[i + 1], this.titles[i + 1]);
  }

  /* go to the previous
   *@param {Mouseevent|keyBoardEvent} e
   */
  previous(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.gallery.length;
    }
    this.loadImage(this.gallery[i - 1], this.titles[i - 1]);
  }

  /*
   *@param {KeyBoardEvent} e
   */

  onKeyup(e) {
    if (e.key === 'Escape') {
      this.close(e);
    } else if (e.key === 'ArrowLeft' || (e.shiftKey && e.keyCode === 9)) {
      this.previous(e);
      e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.keyCode === 9) {
      this.next(e);
      e.preventDefault();
    }
  }

  /*
   *@param {string} url  URL of img
   *@param {string} title of url
   *@return {HTMLElement}
   */
  buildDOM() {
    const dom = document.createElement('div');
    dom.setAttribute('id', 'lightbox');
    dom.innerHTML = `
    <div id="lightbox" type='modal' role=”dialog" class="dialog" aria-label="Utiliser les flêches de direction pour changer l'oeuvre et échappe pour fermer la modale">
      <div class="lightbox_position">
        <nav>
            <button class="lightbox_close" aria-label="ferme la boite dialog">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="lightbox_next" aria-label="image suivante">
                <i class="fas fa-chevron-right"></i>
            </button>
            <button class="lightbox_previous" aria-label="image précédante">
                <i class="fas fa-chevron-left"></i>
            </button>
        </nav>
        <div class="lightbox_container">
            <div class="box_media_lightbox">
            </div>
            <div class="box_text">  
                <h3></h3>
            </div>
        </div>
      </div>
    </div>`;
    dom
      .querySelector('.lightbox_close')
      .addEventListener('click', this.close.bind(this));
    dom
      .querySelector('.lightbox_next')
      .addEventListener('click', this.next.bind(this));
    dom
      .querySelector('.lightbox_previous')
      .addEventListener('click', this.previous.bind(this));
    return dom;
  }
}
