/* eslint-disable no-unused-vars */
import {
  photographerUrlId,
  getData,
  getPhotographer,
  getMedias,
} from '../data/data.js';
import { getSelectMedia, sortingMedia, iconUpDown } from '../utils/mediaFiltrage.js';
import PageMediaFactory from '../factories/pagemedia.js';
import Lightbox from '../utils/lightbox.js';
import { getUserModalDOM } from '../utils/contactForm.js';

// header photograph
export default async function displayDataPageHeader(photographer, data) {
  const mediaModel = PageMediaFactory(photographer, data);
  const getUserHeaderDOM = mediaModel.getUserHeaderDOM();
  // modal contact
  getUserModalDOM(photographer);
}

async function initPage() {
  const data = await getData();
  const photographer = getPhotographer(data, photographerUrlId);
  const media = getMedias(data, photographerUrlId);
  // header page title
  document.title = `Fisheye - ${photographer.name}`;
  // creation page
  displayDataPageHeader(photographer, media);
  // Register of selection sorting
  getSelectMedia();
  // boxmedia with popularity default choice
  sortingMedia(photographer, media);
  // boxmedia if choice another selection of sorting
  const formSorting = document.querySelector('.form_sorting');
  formSorting.addEventListener('change', () => sortingMedia(photographer, media));

  const listLi = formSorting.querySelectorAll('li');
  const sortingUl = document.querySelector('.sorting_ul');
  const inputs = formSorting.querySelector('input');

  listLi.forEach((li) => li.addEventListener('keyup', (e) => {
    if (e.key === '' || e.key === 'Enter') {
      iconUpDown();
      const activeLi = document.activeElement;
      activeLi.querySelector('input').checked = true;
      listLi.forEach((item) => {
        item.classList.remove('visible');
        item.classList.add('hidden');
      });
      sortingMedia(photographer, media);
    }
  }));

  Lightbox.initLightbox();
}

initPage();
