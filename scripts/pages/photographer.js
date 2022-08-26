/* eslint-disable no-unused-vars */
import {
  photographerUrlId,
  getData,
  getPhotographer,
  getMedias,
} from '../data/data.js';
import { getSelectMedia, sortingMedia, setupSelector } from '../utils/mediaFiltrage.js';
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
  const select = document.querySelector('select');

  const selector = document.querySelector('.custom-select');
  // const dropDown = document.querySelector('dropDown');
  // select.addEventListener('change', () => sortingMedia(photographer, media));

  setupSelector(selector);
  selector.addEventListener('change', (e) => {
    sortingMedia(photographer, media);
    Lightbox.initLightbox();
  });

  Lightbox.initLightbox();
}

initPage();

// function stop(e) {
//   const dropDown = document.querySelector('ul');
//   const select = document.querySelector('.div_select select');
// if (e.key === 'Enter' && dropDown !== null && document.activeElement === select) {
//   dropDown.remove();
// }}
