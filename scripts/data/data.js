const params = new URLSearchParams(document.location.search);
export const photographerUrlId = params.get('id');

export async function getData() {
  const response = await fetch('../data/photographers.json');
  if (!response.ok) {
    const message = `An error has occured with fetch: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}

export function getPhotographers(data) {
  const { photographers } = data;
  return photographers;
}

export function getPhotographer(data, id) {
  const { photographers } = data;
  const photographer = photographers.find((item) => item.id == id);
  console.log(photographer);
  return photographer;
}

export function getMedias(data,photographerId) {
  const medias = data.media;
  const media = medias.filter((item) => item.photographerId == photographerId);
  console.log(media);
  return media;
}

export function updateTotalLikes(numberToAdd) {
  const totalDOM = document.querySelector('.totalLikesTitle');
  const newTotal = parseInt(totalDOM.textContent, 10) + numberToAdd;
  totalDOM.textContent = newTotal;
}
