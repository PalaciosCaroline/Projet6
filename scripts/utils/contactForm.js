/* eslint-disable no-console */
// dom elements
const contactbtn = document.querySelector('.contact_button');
const modal = document.getElementById('contact_modal');
const formContact = document.getElementById('form_contact');
const entries = document.querySelectorAll('.entry');
const header = document.querySelector('#contact_modal > .modal > header');
const messageSend = document.getElementById('message_send');
const btnclose = header.querySelector('img');

function logUserInformations() {
  console.log('Données fournies par l\'utilisateur: ');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < entries.length; i++) {
    console.log(`${formContact[i].title}: ${formContact[i].value}`);
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < entries.length; i++) {
    formContact[i].value = '';
  }
  formContact.style.display = 'none';
  const h2 = document.getElementById('modalContactTitle');
  h2.classList.add('hidden');
  messageSend.classList.remove('hidden');
  messageSend.focus();
  btnclose.focus();
}

function closeModal() {
  messageSend.classList.add('hidden');
  contactbtn.focus();
  modal.style.display = 'none';
}

export function getUserModalDOM(photographer) {
  const h2 = document.createElement('h2');
  h2.innerHTML = `<h2 tabindex="0" id="modalContactTitle">Contactez-moi<br>${photographer.name}</h2>`;
  header.appendChild(h2);
  h2.parentNode.insertBefore(h2, btnclose);
  messageSend.innerHTML = `<div id="message_send" class="block">Merci<br>Votre message a bien été envoyé à <br>${photographer.name}.         
    </div>`;
  formContact.addEventListener('submit', (event) => {
    event.preventDefault();
    logUserInformations();
    messageSend.focus();
  });

  modal.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      contactbtn.focus();
      closeModal();
    }
  });

  btnclose.addEventListener('click', closeModal);

  btnclose.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.key === 'Enter' || e.key === ' ') {
      closeModal();
    }
  });
  return formContact;
}

export function displayModal() {
  const h2 = document.getElementById('modalContactTitle');
  h2.classList.remove('hidden');
  modal.style.display = 'block';
  formContact.style.display = 'block';
  h2.focus();
  messageSend.classList.add('hidden');
  // keep focus in the modal
  const focusableElements = 'button, input, textarea, [tabindex]:not([tabindex="-1"])';
  const modalForm = document.querySelector('#modalForm');
  const firstFocusableElement = modalForm.querySelectorAll(focusableElements)[0];
  const focusableContent = modalForm.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];
  document.addEventListener('keydown', (e) => {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    if (!isTabPressed) {
      return;
    }
    if (e.shiftKey) { // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      e.preventDefault();
    }
  });
  firstFocusableElement.focus();
}
