/*
*@property {HTMLElement} element
*@property {string[]} gallery path to media of ligthbox
*@property {string} url  URL of the media display
*/


export class Lightbox {
   static initLightbox(){
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
    const li = document.querySelectorAll('.cardImg');
    const la = document.querySelectorAll('a[title]');
    // const h3 = Array.querySelectorAll('h3');
    // const la = document.querySelectorAll('a[title]');
    // const la = Array.from(li);
    console.log(la);
    // const titles = Array.from(document.querySelectorAll('a[dataId]'));
// console.log(titles);
    // const title = Array.from(document.querySelectorAll('index'));
    // console.log(title)
    const gallery = links.map(link => link.getAttribute('href'));
    const lar = links.map(link => link.getAttribute('title'));
    console.log(lar);
    
    

    links.forEach(link => link.addEventListener('click', e =>
    {
    e.preventDefault();
    const la = document.activeElement;
    new Lightbox(e.currentTarget.getAttribute('href'),e.currentTarget.getAttribute('title'), gallery);
    }))
    }
    

/*
*@param {string} url  URL de l'image
*@return {string[]} gallery path to media of ligthbox
*/

    constructor (url,title, gallery) {
        this.element = this.buildDOM(url,title);
        this.loadImage(url,title);
        this.gallery = gallery;
        this.onKeyup = this.onKeyup.bind(this);
        document.body.appendChild(this.element);
        document.addEventListener('keyup', this.onKeyup);
    }

    loadImage (url, title) {
        this.url = null;
        this.title = null;
        const image = new Image();
        const container = this.element.querySelector('.lightbox__container');
        const h3 = this.element.querySelector('h3');
        image.onload = () => {
          this.url = url;
            this.title = title;
        }
        image.src = url;
        h3.innerContent = title;
      }


/* close the lightbox
*@param {Mouseevent|keyBoardEvent} e
*/
      //voir pour enlever le focus
    close(e){
        e.preventDefault();
        this.element.classList.add('hidden');
        window.setTimeout (() => {
        this.element.parentElement.removeChild(this.element)},500);
        document.removeEventListener('keyup', this.onkeyup)
    }

/* go to the next
*@param {Mouseevent|keyBoardEvent} e
*/
//ne marche pas
    next(e){
        e.preventDefault();
        let i = this.gallery.findIndex(image => image === this.url)
        let t = this.gallery.findIndex(title => title === this.title)
        if (i === this.gallery.length - 1) {
          i = -1
        }
        // this.loadImage(this.gallery[i + 1])
        this.buildDOM (this.gallery[i+1]);
    }

/* go to the previous
*@param {Mouseevent|keyBoardEvent} e
*/
    previous(e){
        e.preventDefault();
    }

/*
*
*@param {KeyBoardEvent} e
*/

    onKeyup(e) {
        if(e.key === 'Escape'){
        this.close(e)
        }
    }


/*
*@param {string} url  URL de l'image
*@return {HTMLElement}
*/
    buildDOM (url,title) {
    const dom = document.createElement('div');
    dom.setAttribute("id", 'lightbox');
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
            <div class="box_img">
            <img class="media" src="${url}" alt=${title}>
            </div>
            <div class="box_text">  
                <h3>${title}</h3>
            </div>
        </div>
    </div>`;

    dom.querySelector('.lightbox_close').addEventListener('click', this.close.bind(this));
    dom.querySelector('.lightbox_next').addEventListener('click', this.next.bind(this));
    dom.querySelector('.lightbox_previous').addEventListener('click', this.previous.bind(this));

    return dom;
    }
};
