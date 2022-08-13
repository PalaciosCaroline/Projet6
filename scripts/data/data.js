let params = new URLSearchParams(document.location.search);
export let photographerUrlId = params.get("id");

export async function getData() {
  const response = await fetch("./data/photographers.json");
  if (!response.ok) {
    const message = `An error has occured with fetch: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}

export function getPhotographers(data) {
  const photographers = data.photographers;
  return photographers;
}

export function getPhotographer(data,id) {
  const photographers = data.photographers;
  let photographer = photographers.find((photographer) => photographer.id == id);
  console.log(photographer);
  return photographer;
}

export function getMedias(data,photographerId) {
  const medias = data.media;
  let media = medias.filter((media) => media.photographerId == photographerId);
  console.log(media)
  return media;
}

export function updateTotalLikes(numberToAdd) {
  let totalDOM = document.querySelector('.totalLikesTitle');
  let newTotal = parseInt(totalDOM.textContent) + numberToAdd;
  totalDOM.textContent = newTotal;
}
  
