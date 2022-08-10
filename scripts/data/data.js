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
  let photographers = data.photographers;
  return photographers;
}

export function getPhotographer(data,id) {
  let photographers = data.photographers;
  const photographerChoice = photographers.find((photograph) => photograph.id == id);
  console.log(photographerChoice);
  return photographerChoice;
}

export function getMedias(data,photographerId) {
  const media = data.media;
  let photographerChoiceMedia = media.filter((media) => media.photographerId == photographerId);
  console.log(photographerChoiceMedia)
  return photographerChoiceMedia;
}

export function updateTotalLikes(numberToAdd) {
  let totalDOM = document.querySelector('.totalLikesTitle');
  let newTotal = parseInt(totalDOM.textContent) + numberToAdd;
  totalDOM.textContent = newTotal;
}
  