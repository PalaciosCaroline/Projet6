export default function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;
  const picture = `assets/photographers/photo_choisi/${portrait}`;
  function getUserCardDOM() {
    const article = document.createElement('article');
    const a = document.createElement('a');
    a.href = `./photographer.html?id=${id}`;
    const imgChoisi = document.createElement('img');
    a.title = data.title;
    imgChoisi.setAttribute('src', picture);
    imgChoisi.alt = name;
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    const legende = document.createElement('p');
    legende.textContent = tagline;
    const prices = document.createElement('span');
    prices.textContent = `${price} euros/jours`;
    article.appendChild(a);
    a.appendChild(imgChoisi);
    a.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(legende);
    article.appendChild(prices);
    return (article);
  }
  return {name, picture, city, country, tagline, price, getUserCardDOM};
}
