import { getData, getPhotographers } from '../data/data.js';
import photographerFactory from '../factories/photographers.js';

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
async function init() {
  const data = await getData();
  const photographers = getPhotographers(data);
  displayData(photographers);
}

init();
