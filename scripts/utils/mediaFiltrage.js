// eslint-disable-next-line import/no-cycle
// import { displayDataPageMedia } from '../pages/photographer.js';
import PageMediaFactory from '../factories/pagemedia.js';

export function getSelectMedia() {
  const filterMedia = document.createElement('div');
  document.body.appendChild(filterMedia);
  const boxmedia = document.getElementById('boxmedia');
  filterMedia.parentNode.insertBefore(boxmedia, filterMedia.nextSibling);
  filterMedia.innerHTML = `
    <div class="sorting" aria-label="sélecteur de tri des medias">
      <h3>Trier par</h3>
      <div class="sorting_select">
        <form class="form_sorting" aria-label="trier par"> 
          <fieldset class="c-group" aria-label="Trier les photos">
            <ul tabindex="0">
                <i id="icon_up" class="fas fa-chevron-up"></i>
                <i id="icon_down" class="fas fa-chevron-down"></i>
              <li class='selected formLi menu' c-group__item aria-label="popularité">
                <input tabindex="0" type="radio" id="popularity" value="popularity" name="sorting_option" title="popularity" checked>
                <label for="popularity">Popularité</label>
              </li>
              <li class='formLi menu c-group__item' aria-label="date">
                <input tabindex="0" type="radio" id="date"  value="date" name="sorting_option" title="date">
                <label for="date">Date</label>
              </li>
              <li class='formLi menu c-group__item' aria-label="titre">
                <input tabindex="0" type="radio" id="titre" value="titre" name="sorting_option" title="titre" >
                <label for="titre">Titre</label>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </div>`;
}
function inputChoice() {
  const formSorting = document.querySelector('.form_sorting');
  const ListLi = formSorting.querySelectorAll('li');
  ListLi.forEach((li) => {
    li.classList.remove('selected');
    const input = li.querySelector('input');
    if (input.checked === true) {
      li.classList.add('selected');
      formSorting.target = input.title;
    }
  });
}

export async function displayDataPageMedia(photographer, media) {
  const boxmedia = document.getElementById('boxmedia');
  const mediaModel = PageMediaFactory(photographer, media);
  // box card media
  media.forEach((item) => {
    const mediaModelCard = PageMediaFactory(photographer, item);
    const getMediaCardDOM = mediaModelCard.getMediaCardDOM();
    boxmedia.appendChild(getMediaCardDOM);
  });
  // footer label with Total likes and photographer's rate/day
  const TotalLikeArticle = mediaModel.getTotalLikes();
  boxmedia.appendChild(TotalLikeArticle);
}

export function sortingMedia(photographer, media) {
  const formSorting = document.querySelector('.form_sorting');
  const boxmedia = document.getElementById('boxmedia');
  inputChoice();
  boxmedia.innerHTML = '';
  let newMedia;
  switch (formSorting.target) {
    case 'popularity':
      newMedia = media.sort((a, b) => b.likes - a.likes);
      displayDataPageMedia(photographer, newMedia);
      break;
    case 'date':
      newMedia = media.sort((a, b) => (b.date > a.date ? 1 : -1));
      displayDataPageMedia(photographer, newMedia);
      break;
    case 'titre':
      newMedia = media.sort((a, b) => (a.title > b.title ? 1 : -1));
      displayDataPageMedia(photographer, newMedia);
      break;
    default:
      displayDataPageMedia(photographer, media);
      break;
  }
}
