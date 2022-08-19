// dom elements
const modal = document.getElementById('contact_modal');
const formContact = document.getElementById('form_contact');
const entries = document.querySelectorAll('.entry');
const header = document.querySelector('#contact_modal > .modal > header');
const messageSend = document.getElementById('message_send');
const btnclose = header.querySelector('img');
const main = document.getElementById('main');

export function getUserModalDOM(photographer) {
  const h2 = document.createElement('h2');
  h2.classList.add('name');
  h2.textContent = photographer.name;
  header.appendChild(h2);
  messageSend.innerHTML = `<div id="message_send" class="block">Merci<br>Votre message a bien été envoyé à <br>${photographer.name}.         
    </div>`;
  formContact.addEventListener('submit', (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-use-before-define
    logUserInformations();
  });
  // eslint-disable-next-line no-use-before-define
  btnclose.addEventListener('click', closeModal);
  return formContact;
}

export function displayModal() {
  const h2s = modal.querySelectorAll('h2');
  h2s.forEach((title) => title.classList.remove('hidden'));
  modal.style.display = 'block';
  formContact.style.display = 'block';
  header.focus();
  messageSend.classList.add('hidden');
}
function closeModal() {
  messageSend.classList.add('hidden');
  main.focus();
  modal.style.display = 'none';
}
function logUserInformations() {
  // eslint-disable-next-line no-plusplus, no-console
  console.log('Données fournies par l\'utilisateur: ');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < entries.length; i++) {
    // eslint-disable-next-line no-console
    console.log(`${formContact[i].title}: ${formContact[i].value}`);
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < entries.length; i++) {
    formContact[i].value = '';
  }
  formContact.style.display = 'none';
  const h2s = modal.querySelectorAll('h2');
  h2s.forEach((title) => title.classList.add('hidden'));
  messageSend.classList.remove('hidden');
}
