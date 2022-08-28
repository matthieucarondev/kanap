
// Variables associées aux différents inputs du formulaire
const form = document.querySelector('.cart__order__form');

const prenom = document.querySelector('#firstName');
const nom = document.querySelector('#lastName');
const adresse = document.querySelector('#address');
const ville = document.querySelector('#city');
const mail = document.querySelector('#email');

// Création de RegExp pour les prénoms et noms
const regexNames = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i);

// Création de RegExp pour l'adresse et la ville
const addressRegEx = new RegExp (/^[a-zA-Z0-9\s,.'-]{3,}$/);

// Création de RegExp pour l'adresse mail
const emailRegEx = new RegExp ('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

// Fonction pour validation du prénom ou erreur
const validFirstName = function(inputFirstName) {
    let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');

    if (regexNames.test(inputFirstName.value)) {
        firstNameErrorMsg.innerText = ``;
        return true;
    } else {
        firstNameErrorMsg.innerText = `Veuillez renseigner votre prénom (Les chiffres et les caractères spéciaux ne sont pas autorisés)`;
        return false;
    }
}

// Fonction pour validation du nom ou erreur
const validLastName = function(inputLastName) {
    let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');

    if (regexNames.test(inputLastName.value)) {
        lastNameErrorMsg.innerText = ``;
        return true;
    } else {
        lastNameErrorMsg.innerText = `Veuillez renseigner votre nom (Les chiffres et les caractères spéciaux ne sont pas autorisés)`;
        return false;
    }
}

// Fonction pour validation de l'adresse ou erreur
const validAddress = function(inputAddress) {
    let addressErrorMsg = document.querySelector('#addressErrorMsg');
    
    if (addressRegEx.test(inputAddress.value)) {
        addressErrorMsg.innerText = ``;
        return true;
    } else {
        addressErrorMsg.innerText = `Veuillez renseigner le numéro et le nom de votre adresse (Les caractères spéciaux ne sont pas autorisés)`;
        return false;
    }
}

// Fonction pour validation de la ville ou erreur
const validCity = function(inputCity) {
    let cityErrorMsg = document.querySelector('#cityErrorMsg');
    
    if (addressRegEx.test(inputCity.value)) {
        cityErrorMsg.innerText = ``;
        return true;
    } else {
        cityErrorMsg.innerText = `Veuillez renseigner le code postal et le nom de votre ville (Les caractères spéciaux ne sont pas autorisés)`;
        return false;
    }
}

// Fonction pour validation de l'adresse ou erreur
const validEmail = function(inputEmail) {
    let emailErrorMsg = document.querySelector('#emailErrorMsg');

    if (emailRegEx.test(inputEmail.value)) {
        emailErrorMsg.innerText = ``;
        return true;
    } else {
        emailErrorMsg.innerText = `Veuillez renseigner votre adresse mail, elle doit contenir "@" et un point`;
        return false;
    } 
}

// Evenement d'ecoute de l'input prenom
prenom.addEventListener('change', function() {
    validFirstName(this);
});

// Evenement d'ecoute pour l'input nom
nom.addEventListener('change', function() {
    validLastName(this);
});

// Evenement d'ecoute pour l'input adresse
adresse.addEventListener('change', function() {
    validAddress(this);
});

// Evenement d'ecoute pour l'input ville
ville.addEventListener('change', function() {
    validCity(this);
});

// Evenement d'ecoute pour l'input mail
mail.addEventListener('change', function() {
    validEmail(this);
});

//******** ENVOYER LE FORMULAIRE ********/

// Ecouter la soumission du formulaire
const postUrl = 'http://localhost:3000/api/products/order/';
form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
});

// Fonction pour créer l'objet "contact" et les id des produits choisis
const createObjectToSend = () => {
    
    // Création de l'objet "contact" contenant les éléments du formulaire
    let contact = {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: mail.value,
    };
    
    let LS = addCart();
    let products = [];

    for (i = 0; i < LS.length; i++) {
        if (products.find((e) => e == LS[i].id)) {
            console.log('not found');
        } else {
            products.push(LS[i].id);
        }
    }

    let sendToServ = JSON.stringify({ contact, products });
    return sendToServ;
}

// Fonction d'envoie du formulaire
const sendForm = () => {
    let LS = addCart();

    // Si la qty d'un élément est inférieur ou égal à 0 / supérieur ou égal à 101
    for (i = 0; i < LS.length; i++) {
        if (LS[i].qty <= 0 || LS[i].qty >= 101) {
            return alert(`La quantié d'un article n'est pas comprise entre 1 et 100`);
        }
    }

    // Si le panier est vide
    if (LS.length == 0) {
        return alert(`Votre panier est vide !`);  
    
    // Si le panier n'est pas vide
    } else {
        // Si tous les champs du formulaire sont valides
        if (validFirstName(prenom) && validLastName(nom) && validAddress(adresse) && validCity(ville) && validEmail(mail)) {
            let sendToServ = createObjectToSend();
            fetch(postUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: sendToServ,
            })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.clear();
                    document.querySelector('.cart__order__form').reset();
                    document.location.href = "confirmation.html?id=" + data.orderId;
                })
                .catch(() => {
                    alert(`Une erreur interne est survenue`);
                });
        } else {
            return alert(`Veuillez vérifier que tous les champs du formulaire sont correctement remplis.`)
        }
    }
}