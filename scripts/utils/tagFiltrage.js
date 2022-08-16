// eslint-disable-next-line import/no-cycle
import { displayDataPageMedia } from '../pages/photographer.js';

export function getSelectMedia() {
  const filterMedia = document.createElement('div');
  document.body.appendChild(filterMedia);
  const boxmedia = document.getElementById('boxmedia');
  filterMedia.parentNode.insertBefore(boxmedia, filterMedia.nextSibling);
  filterMedia.innerHTML = `
    <div class="sorting" aria-label="sélecteur de tri des medias">
      <h3>Trier par</h3>
      <div class="sorting_select">
        <form class="form_sorting" aria-label="Order by">    
            <ul tabindex="0"  aria-label="Trier les photos">
                <i id="icon_up" class="fas fa-chevron-up"></i>
                <i id="icon_down" class="fas fa-chevron-down"></i>
              <li class='selected inactive menu' tabindex="0"  aria-label="popularité">
                <input type="radio" id="popularity" value="popularity" name="sorting_option" title="popularity" checked>
                <label for="popularity">Popularité</label>
              </li>
              <li class='inactive menu' tabindex="0" aria-label="date">
                <input type="radio" id="date" value="date" name="sorting_option" title="date">
                <label for="date">Date</label>
              </li>
              <li class='inactive menu' tabindex="0" aria-label="titre">
                <input type="radio" id="titre" value="titre" name="sorting_option" title="titre" >
                <label for="titre">Titre</label>
              </li>
            </ul>
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
