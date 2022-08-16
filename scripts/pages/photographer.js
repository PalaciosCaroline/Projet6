/* eslint-disable no-unused-vars */
import {
  photographerUrlId,
  getData,
  getPhotographer,
  getMedias,
} from '../data/data.js';
// eslint-disable-next-line import/no-cycle
import { getSelectMedia, sortingMedia } from '../utils/tagFiltrage.js';
import PageMediaFactory from '../factories/pagemedia.js';
import Lightbox from '../utils/lightbox.js';
import { getUserModalDOM } from '../utils/contactForm.js';

// header photograph
export async function displayDataPageHeader(photographer, data) {
  const mediaModel = PageMediaFactory(photographer, data);
  const getUserHeaderDOM = mediaModel.getUserHeaderDOM();
  // modal contact
  getUserModalDOM(photographer);
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

async function initPage() {
  const data = await getData();
  const photographer = getPhotographer(data, photographerUrlId);
  const media = getMedias(data, photographerUrlId);
  // header page title
  document.title = `Fisheye - ${photographer.name}`;
  // creation page
  displayDataPageHeader(photographer, media);
  getSelectMedia();
  // boxmedia with popularity default choice
  sortingMedia(photographer, media);
  // boxmedia if choice another selection
  const formSorting = document.querySelector('.form_sorting');
  formSorting.addEventListener('change', () => sortingMedia(photographer, media));
  Lightbox.initLightbox();
}

initPage();
