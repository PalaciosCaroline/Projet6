function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function logUserInformations() {
    const formContact = document.getElementById('form_contact');
    const firstName = document.getElementById("prenom");
    const lastName = document.getElementById("nom");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const userInformation = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        message: message.value
    };
    console.log("Données fournies par l'utilisateur: ")
    for (let property in userInformation) {
        console.log(`${property}: ${userInformation[property]}`)
    }
    for (let property in formContact) {
        formContact[property].value = '';
    }
}