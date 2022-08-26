/*
 *@property {HTMLElement} element
 *@property {string[]} gallery path to media of ligthbox
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
      // const lightbox = document.getElementById('lightbox');
      // const button = lightbox.querySelector('lightbox_next');
      // button.focus();
      // const h3 = document.querySelector('lightbox > h3');
      // h3.focus();
    }));

    links.forEach((link) => link.addEventListener('keypress', (e) => {
      // e.preventDefault();
      if (e.key === 'Enter' || e.key === ' ') {
        // eslint-disable-next-line no-new
        new Lightbox(e.currentTarget.getAttribute('href'), e.currentTarget.getAttribute('title'), gallery, titles);
        // const h3 = document.querySelector('lightbox > h3');
        // h3.focus();
        // const lightbox = document.getElementById('lightbox');
        // const button = lightbox.querySelector('lightbox_next');
        // button.focus();
      }
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
    document.addEventListener('keyup', this.onKeyup);
  }

  loadImage(url, title) {
    this.url = url;
    this.title = title;
    const boxMedia = this.element.querySelector('.box_media_lightbox');
    const h3 = this.element.querySelector('h3');
    boxMedia.innerHTML = '';
    h3.innerHTML = '';
    if (url.includes('jpg')) {
      const image = new Image();
      boxMedia.appendChild(image);
      image.classList.add('media');
      image.ariaLabel = this.title;
      image.alt = this.title;
      image.src = url;
      image.tabIndex = 1;
      image.focus();
    } else if (url.includes('mp4')) {
      const video = document.createElement('video');
      boxMedia.appendChild(video);
      video.alt = this.title;
      video.ariaLabel = this.title;
      video.setAttribute('controls', true);
      video.setAttribute('autoplay', true);
      video.classList.add('videomedia');
      video.src = url;
      video.tabIndex = 1;
      video.focus();
    }
    h3.textContent = title;
    h3.tabIndex = 1;
    // h3.ariaLabel = `vue de ${title}`;
    // h3.focus();
  }
  /* close the lightbox
   *@param {Mouseevent|keyBoardEvent} e
   */

  close(e) {
    e.preventDefault();
    this.element.classList.add('hidden');
    // pas sûre de l'utilité du remove
    this.element.remove();
    document.removeEventListener('keyup', this.onkeyup);
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
   *
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
   *@param {string} url  URL de l'image
   *@return {HTMLElement}
   */
  buildDOM(title) {
    const dom = document.createElement('div');
    dom.setAttribute('id', 'lightbox');
    dom.innerHTML = `
    <div id="lightbox" type='modal' role=”dialog" class="dialog" aria-label=”ouvre l'image dans la boite dialog”>
      <nav>
          <button class="lightbox_close" aria-label="ferme la boite dialog">
              <i class="fa-solid fa-xmark"></i>
          </button>
          <button class="lightbox_next" aria-label="image suivante" tabIndex=1>
              <i class="fas fa-chevron-right"></i>
          </button>
          <button class="lightbox_previous" aria-label="image précédante">
              <i class="fas fa-chevron-left"></i>
          </button>
      </nav>
      <div class="lightbox_container">
          <div class="box_media_lightbox" tabIndex=1>
          </div>
          <div class="box_text">  
              <h3>${title}</h3>
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


// let nonModalNodes;

// function openDialog() {    
//   const modalNodes = Array.from( document.querySelectorAll('dialog *') );
//   nonModalNodes = document.querySelectorAll('body *:not(dialog):not([tabindex="-1"])');

//   for (let i = 0; i < nonModalNodes.length; i++) {
//     let node = nonModalNodes[i];

//     if (!modalNodes.includes(node)) {
//       node._prevTabindex = node.getAttribute('tabindex');
//       node.setAttribute('tabindex', -1);
//       node.ariaHidden = true;
//       node.style.outline = 'none';
//     } 
//   }
// }

// function closeDialog() {
//   if (this.type === 'modal') {
//     document.body.style.overflow = null;
//     for (let i = 0; i < nonModalNodes.length; i++) {
//       const node = nonModalNodes[i];
//       if (node._prevTabindex) {
//         node.setAttribute('tabindex', node._prevTabindex);
//         node._prevTabindex = null;
//         node.ariaHidden = false;
//       }
//       else {
//         node.removeAttribute('tabindex');
//       }
//       node.style.outline = null;
//     }
//   }
// }

// function blocTab() {
//   const boxmedia = document.getElementById('section_media');
//   boxmedia.ariaHidden = true;
//   const header = document.querySelector('header');
//   header.ariaHidden = true;
// }