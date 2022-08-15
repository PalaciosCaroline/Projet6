import {displayDataPageMedia} from "../pages/photographer.js";

export function getSelectMedia(photographer, media) {
  const filterMedia = document.createElement('div');
  document.body.appendChild(filterMedia);
  // const boxmedia = document.getElementById('box_media');
  filterMedia.parentNode.insertBefore(boxmedia, filterMedia.nextSibling);
  filterMedia.innerHTML = `
    <div class="sorting" aria-label="sélecteur de tri des medias">
      <h3>Trier par</h3>
      <div class="sorting_select">
        <form class="form_sorting">    
            <ul tabindex="0"  aria-label="Trier les photos">
                <i id="icon_up" class="fas fa-chevron-up"></i>
                <i id="icon_down" class="fas fa-chevron-down"></i>
              <li class='selected inactive menu' tabindex="0"  aria-label="popularité">
                
                <input type="radio" id="popularity" value="popularity" name="sorting_option" title="popularity" >
                <label for="popularity">Popularité</label>
              </li>
              <li class='inactive menu' tabindex="0" aria-label="date">
                <input type="radio" id="date" value="date" name="sorting_option" title="date" checked>
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
  ListLi.forEach(li => {
    li.classList.remove('selected');
    const input = li.querySelector('input');
    console.log(ListLi);
    console.log(input)
    if (input.checked == true) {
      li.classList.add('selected');
      formSorting.target = input.title;
      console.log(input.value)
    }
})}
export function sortingMedia(photographer,media) {
  const formSorting = document.querySelector('.form_sorting');
  const boxmedia = document.getElementById('boxmedia');
  inputChoice();
  boxmedia.innerHTML = '';
  switch (formSorting.target) {
    case 'popularity':
      media = media.sort((a, b) => b.likes - a.likes);
      displayDataPageMedia(photographer, media);
      break;
    case 'date':
      media = media.sort((a, b) => (b.date > a.date ? 1 : -1));
      displayDataPageMedia(photographer, media);
      break;
    case 'titre':
      media = media.sort((a, b) => (a.title > b.title ? 1 : -1));
      displayDataPageMedia(photographer, media);
      break;
    default :
      break;
  }
}
