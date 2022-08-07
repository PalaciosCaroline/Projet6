
// import {photographerFactory} from "../factories/photographer.js";

 async function getPhotographers() {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) {
        const message = `An error has occured with fetch: ${response.status}`;
        throw new Error(message);
      }
       const data = await response.json();
        const photographers = data.photographers;
        console.log(photographers);
   return photographers;
}

async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
};


async function init() {
        const photographers = await getPhotographers();
        // const media = await getMedias();
        displayData(photographers);
}

init();


// export { getPhotographers };
//  export { getMedias };
