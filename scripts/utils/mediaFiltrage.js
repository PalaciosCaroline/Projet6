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
        <form  class="form_sorting" aria-label="trier par"> 
          <fieldset class="c-group" aria-label="Trier les photos">
            <ul tabindex="0" class='sorting_ul'>
              <i id="icon_sort_down" class="fas fa-chevron-down"></i>
              <li class='selected hidden formLi c-group__item' role='checkbox' tabindex="0"  aria-label="popularité">
                <i id="icon_sort_up" class="hidden fas fa-chevron-up"></i>
                <label  for="popularity">
                <input  type="radio" id="popularity" value="popularity" name="sorting_option" title="popularity" checked>Popularité
                </label>
              </li>
              <li role='checkbox' class='hidden formLi c-group__item' tabindex="0" aria-label="date">
                <label for="date">
                  <input  type="radio" id="date"  value="date" name="sorting_option" title="date">Date
                  </label>
              </li>

              <li role='checkbox' class='hidden formLi c-group__item' tabindex="0" aria-label="titre">
                <label for="titre">
                  <input type="radio" id="titre" value="titre" name="sorting_option" title="titre" >Titre
                  </label>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </div>`;

  const formSorting = document.querySelector('.form_sorting');
  const listLi = formSorting.querySelectorAll('li');
  const sortingUl = document.querySelector('.sorting_ul');

  function VisibleSortMenu() {
    iconUpDown();
    listLi.forEach((li) => {
      li.classList.add('visible');
      li.classList.remove('hidden');
    });
  }

  function hiddenSortMenu() {
    iconUpDown();
    listLi.forEach((li) => {
      li.classList.remove('visible');
      li.classList.add('hidden');
    });
  }

  sortingUl.addEventListener('mouseover', VisibleSortMenu);
  sortingUl.addEventListener('mouseout', hiddenSortMenu);
  sortingUl.addEventListener('focus', VisibleSortMenu);
  listLi[2].addEventListener('focusout', hiddenSortMenu);
}

function inputChoice() {
  const formSorting = document.querySelector('.form_sorting');
  const ListLi = formSorting.querySelectorAll('li');
  ListLi.forEach((li) => {
    li.classList.remove('selected');
    const input = li.querySelector('input');
    if (input.checked === true) {
      li.classList.add('selected');
      formSorting.target = input.value;
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

export function iconUpDown() {
  const iconSortDown = document.getElementById('icon_sort_down');
  const iconSortUp = document.getElementById('icon_sort_up');
  iconSortUp.classList.toggle('hidden');
  iconSortDown.classList.toggle('hidden');
}
