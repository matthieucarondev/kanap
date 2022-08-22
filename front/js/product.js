
// recupération  de la chaine  de requéte url
const wls =window.location.search;
const URLsearchPar= new URLSearchParams(wls);
const id = URLsearchPar.get(`id`);
let urlId = 'http://localhost:3000/api/products/' + id;

fetch(urlId)
    .then((reponse) => reponse.json()
    .then((data) => {
//insert image
  const img =document.querySelector(".item__img");
  img.innerHTML = ` <img src="${data.imageUrl}" alt="${data.altTxt}"/>`;
//insert h1
  let H1 = document.querySelector("#title");
  H1.innerHTML = `${data.name}`;
//insert prix
  let Price = document.querySelector("#price");
  Price.innerHTML = `${data.price}`;
//insert description
  let descr = document.querySelector("#description");
  descr.innerHTML = `${data.description}`;
//insert color
      const dom = new DOMParser();
        const color= document.querySelector('#colors');

        for ( i = 0; i < data.colors.length ; i++) {
          const colorProduit =
           `<option value='${data.colors[i]}'>${data.colors[i]}</option>`;
           const choiceColors =dom.parseFromString(colorProduit,"text/html");
           color.appendChild(choiceColors.body.firstChild);
         
        }
  }))
  .catch((err) =>
  document.getElementById('items').innerText = `le produit est introuvable !`);

  //enregistre la couleur choisi
function valueColor(){
  const color = document.querySelector('#colors');
  return color.value ;
}
  //enregistre la quantité choisi
function valueQty(){
  const qty = document.querySelector('#quantity');
  return qty.value ;
}


//envoyer la couleur et la quantity au localStorage
 const addToCartproduit= (id, color, qty) => {
  //pas de color choisi ni quantity'erreur'
  if (color=="" && qty=="0") {
    return alert(`Veuillez choisir une couleur et une quantité entre 1 et 100`)
  }
  //pas de couleur erreur
  if (color=="") {
    return alert(`Veuillez choisir une couleur`)
  }
  // quantity non comprise entre 0 et 100 "erreur"
  if (qty<=0 ||qty>=101) {
    return alert(`Veuillez une quantité entre 1 et 100`)
  } 
 
  //si panier vide => créer panier
  let produitLocalStorage = addCart();
  if (produitLocalStorage.length == 0 ) {
    produitLocalStorage=[{id: id, color: color, qty: qty}];
    //panier deja creer
    } else {
      let basket = false;
      //produit et couleur existe déjà additionné les quantité
      for (let i= 0; i < produitLocalStorage.length; i++) {
       if (id === produitLocalStorage[i].id && color === produitLocalStorage[i].color) {
         basket  = true;
        produitLocalStorage[i].qty += qty;
  
        }
      }
      //si il n'existe pas le creer
      if (basket==false) {
        const produit = {id:id,color:color,qty:qty};
      produitLocalStorage.push(produit);
      }
 }
      localStorage.setItem(`addProduit`, JSON.stringify(produitLocalStorage));
      alert(`produit(s) ajouté(s) au panier!`);
   
  }
 // Bouton d'ajouter

let addToCart = document.querySelector(`#addToCart`);

addToCart.addEventListener(`click`, () => {
 
    let color = valueColor();
    let qty = parseInt(valueQty());
    addToCartproduit( id, color, qty);

 });
const addCart = () => {   
    let produitLocalStorage  = [];
    if (localStorage.getItem(`addProduit`) != null) { 
        produitLocalStorage = JSON.parse(localStorage.getItem(`addProduit`));
    }
    return produitLocalStorage ;}

