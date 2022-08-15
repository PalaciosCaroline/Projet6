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
    }));
  }

  /*
   *@param {string} url  URL de l'image
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
    const boxMedia = this.element.querySelector('.box_media');
    const h3 = this.element.querySelector('h3');
    boxMedia.innerHTML = '';
    h3.innerHTML = '';
    if (url.includes('jpg')) {
      const image = new Image();
      boxMedia.appendChild(image);
      image.classList.add('media');
      image.alt = this.title;
      image.src = url;
      image.ariaLabel = title;
    } else if (url.includes('mp4')) {
      const video = document.createElement('video');
      boxMedia.appendChild(video);
      video.ariaLabel = title;
      video.setAttribute('controls', true);
      video.classList.add('videomedia');
      video.src = url;
    }
    h3.textContent = title;
  }
  /* close the lightbox
   *@param {Mouseevent|keyBoardEvent} e
   */
  // voir pour enlever le focus

  close(e) {
    e.preventDefault();
    this.element.classList.add('hidden');
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
    } else if (e.key === 'ArrowLeft') {
      this.previous(e);
    } else if (e.key === 'ArrowRight') {
      this.next(e);
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
    <div id="lightbox" role=”dialog" aria-label=”image closeup view”>
        <nav>
            <button class="lightbox_close" aria-label="fermeture de la lightbox">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="lightbox_next" aria-label="média suivant">
                <i class="fas fa-chevron-right"></i>
            </button>
            <button class="lightbox_previous" aria-label="média précédent">
                <i class="fas fa-chevron-left"></i>
            </button>
        </nav>
        <div class="lightbox_container">
            <div class="box_media">
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
