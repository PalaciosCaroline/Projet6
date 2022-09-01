/* eslint-disable no-param-reassign */
import PageMediaFactory from '../factories/pagemedia.js';

export function getSelectMedia() {
  const filterMedia = document.createElement('div');
  const boxmedia = document.getElementById('boxmedia');
  document.body.appendChild(filterMedia);
  filterMedia.parentNode.insertBefore(boxmedia, filterMedia.nextSibling);
  filterMedia.innerHTML = `
    <form  class="form_sorting"> 
      <div class="div_select">
          <label class="custom-select">Trier par
            <select name="tri" aria-roledescription="popularité, date ou titre. Utiliser les flêches du bas ou du haut, le tri des oeuvres est automatiquement fait.">
              <option class="" value="popularity" aria-label="les oeuvres ont été triées par popularité" selected>Popularité</option>
              <option class="" value="date" aria-label="les oeuvres ont été triées par date">Date</option>
              <option class="" value="titre" aria-label="les oeuvres ont été triées par titre">Titre</option>
            </select>
            <i class="fa-solid fa-chevron-down"></i>
          </label>
      </div>
    </form> `;
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
  const select = document.querySelector('select');
  const boxmedia = document.getElementById('boxmedia');
  boxmedia.innerHTML = '';
  let newMedia;
  switch (select.value) {
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

function sortMenuDrop(e) {
  e.preventDefault();
  if (document.querySelector('ul') !== null) {
    return;
  }
  const selector = document.querySelector('.custom-select');
  const select = selector.children[0];
  const dropDown = document.createElement('ul');
  dropDown.className = 'selector-options';

  [...select.children].forEach((option) => {
    const dropDownOption = document.createElement('li');
    dropDownOption.className = 'optionLi';
    dropDownOption.textContent = option.textContent;
    // change sort with mouseEvent
    dropDownOption.addEventListener('mousedown', (event) => {
      event.stopPropagation();
      select.value = option.value;
      selector.value = option.value;
      select.dispatchEvent(new Event('change'));
      selector.dispatchEvent(new Event('change'));
      dropDown.remove();
    });
    dropDown.appendChild(dropDownOption);
  });
  selector.appendChild(dropDown);

  // handle click out
  document.addEventListener('click', (event) => {
    if (!selector.contains(event.target)) {
      dropDown.remove();
    }
  });
  // tab out
  document.addEventListener('keyup', () => {
    if (dropDown !== null && document.activeElement !== select) {
      dropDown.remove();
    }
  });
}
// style of li in dropdown select sort
function styleHoverSort(item) {
  item.style.color = '#000000';
  item.style.backgroundColor = '#DB8876';
}
function styleNoHoverSort(item1, item2) {
  item1.style.color = '#fff';
  item1.style.backgroundColor = '#901C1C';
  item2.style.color = '#fff';
  item2.style.backgroundColor = '#901C1C';
}

export function colorHoverSort() {
  const dropDown = document.querySelector('ul');
  const select = document.querySelector('.div_select select');
  const listLi = document.querySelectorAll('li');
  if (select.value === 'popularity' && dropDown !== null) {
    styleHoverSort(listLi[0]);
    styleNoHoverSort(listLi[1], listLi[2]);
  }
  if (select.value === 'date' && dropDown !== null) {
    styleHoverSort(listLi[1]);
    styleNoHoverSort(listLi[0], listLi[2]);
  }
  if (select.value === 'titre' && dropDown !== null) {
    styleHoverSort(listLi[2]);
    styleNoHoverSort(listLi[0], listLi[1]);
  }
}

function accessSort() {
  const selector = document.querySelector('.custom-select');
  colorHoverSort();
  selector.addEventListener('change', () => {
    colorHoverSort();
  });
}
// constructor of visual select list
export function setupSelector(selector) {
  selector.addEventListener('mousedown', (e) => sortMenuDrop(e));
  selector.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sortMenuDrop(e);
      accessSort();
    }
  });
}
