const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
const urlApi =`http://localhost:3000/api/products/`+ id ;

//recupére api
fetch(urlApi)
  .then((response) => response.json()
  .then((data) => {
    //afficher image
    let img = document.querySelector(".item__img");
    img.innerHTML=`<img src="${data.imageUrl}" alt="${data.altTxt}">`;
  //afficher title
    let h1 = document.querySelector("#title");
    h1.innerHTML=`${data.name}`;
//afficher prix
let price= document.querySelector("#price");
price.innerHTML=`${data.price}`;
//afficher description
 let descr = document.querySelector("#description")
descr.innerHTML=`${data.description}`;
//selectionner couleur
let parse = new DOMParser();
let colors = document.querySelector("#colors");
for (i = 0; i < data.colors.length; i++) {
  let selectColors=
   `<option value='${data.colors[i]}'>${data.colors[i]}</option>`;
          const displayColors = parse.parseFromString(selectColors, "text/html");
            colors.appendChild(displayColors.body.firstChild);
}
}))
// Récuperer la couleur choisie
function colorValue() {
    let color = document.querySelector(`#colors`);
    return color.value;
};





const addToCartElement = (id, color, qty) => {
if (color == null || color === "" || qty == null || qty == 0 ||  qty > 100 ) {
  return  alert("Veuillez sélectionner une  couleur et une quantité compris entre 1 et 100");}
 //récupérer local storage
//let LS = localStorage.getitem("cart");
const addCart= () => {   
    let LS = [];
    if (localStorage.getItem(`cart`) != null) { 
        LS = JSON.parse(localStorage.getItem(`cart`));
    }
    return LS;
}
let LS=addCart();
   // si le LS est vide alors.creer un nouveau table et push data dans le tableau
     if (LS.length==0) {
       LS=[{id: id, color: color, qty: qty}]
     //else (si LS n'est pas vide)
      } else {
      let found = false;
       //vérifere si le id de data et color de data deja présent dans le ls --> find
      for (let i = 0; i < LS.length; i++) {
                if (id === LS[i].id && color === LS[i].color) {
                    found = true;
                    LS[i].qty += qty;}
       } 
      
       // S'ils n'existent pas, créer un nouvel objet item dans le tableau du panier
            if (found == false) {
                let Data = {id: id, color: color, qty: qty};
                LS.push(Data); 
            }
          }
              //enregistré localstorage
localStorage.setItem('cart', JSON.stringify(LS));
alert(`Produit(s) ajouté(s) au panier !`);
          }



// Récuperer la quantité choisie
function qtyValue() {
    let qty = document.querySelector(`#quantity`);
    return qty.value;
};
// Bouton d'ajout au panier
const addToCart = document.querySelector(`#addToCart`);
addToCart.addEventListener(`click`, () => {
    let color = colorValue();
    let qty = parseInt(qtyValue());

  addToCartElement(id, color, qty);
});
