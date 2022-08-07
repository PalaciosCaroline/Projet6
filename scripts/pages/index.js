
// import {photographerFactory} from "../factories/photographer.js";

 async function getPhotographers() {

    const response = await fetch("./data/photographers.json");
       const data = await response.json();
      const photographers = data.photographers;
        // .catch((error) =>
        //      console.log('Il y a eu un problème avec l\'opération fetch'));
        console.log(photographers);
   return photographers;
}

//  async function getMedias() {
//     const response = await fetch("./data/photographers.json");
//     const data = await response.json();
//    const media = data.media;
//      // .catch((error) =>
//      //      console.log('Il y a eu un problème avec l\'opération fetch'));
//     return media;
// }


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
