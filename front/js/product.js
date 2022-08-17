

const produit = window.location.search.split("?card").join("");
console.log(produit);

let produitData = [];

const fletchProduit = async () => {
  await fetch(`http://localhost:3000/api/products/${produit}`)
    .then((res) => res.json())
    .then((promise) => {
      produitData = promise;
      console.log(promise);
    });
};
const produitDisplay = async () => {
  await fletchProduit();

  document.getElementById("img").innerHTML = `
  <img src="${produitData.imageUrl}" alt="${produitData.altTxt}"/>`;

 document.getElementById("Button").innerHTML = ` 
 <button id="${produitData._id}" >Ajouter au panier</button>`;

 document.getElementById("quant").innerHTML = ` 
  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
 <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">`;

  let H1 = document.getElementById("title");
  H1.innerHTML += `${produitData.name}`;

  let Price = document.getElementById("price");
  Price.innerHTML += `${produitData.price}`;

  let descr = document.getElementById("description");
  descr.innerHTML += `${produitData.description}`;

  let select = document.getElementById("colors");

  console.log(produitData.colors);
  produitData.colors.forEach((color) => {
    console.log(document.createElement("option"));
    let tagOption = document.createElement("option");

    tagOption.innerHTML = `${color}`;
    tagOption.value = `${color}`;

    select.appendChild(tagOption);

    const quantityProduit = document.getElementById("quantity");
    console.log("quantityProduit");
    console.log(quantityProduit);
    const choixQuantity =quantityProduit.value;

  });
  addBasket(produitData);
};
produitDisplay();

const addBasket = () => {
  let bouton = document.getElementById(produitData._id);
  console.log(bouton);
  bouton.addEventListener("click", () => {
    let produitTableau = JSON.parse(localStorage.getItem("produit"))
    let selects = document.getElementById("colors");
    let quantity = document.getElementById("quantity");
    console.log(quantity.value);
    console.log(selects.value);
    console.log(produitTableau);

const fusionProduit= Object.assign({} ,produitData,{
color : `${selects.value}`,
quantité: `${quantity.value}`,
});
console.log(fusionProduit);

    if(produitTableau==null) {
      produitTableau = [];
      produitTableau.push(produitData);
      console.log(produitTableau);
      localStorage.setItem("produit",JSON.stringify(produitTableau));
    } else if (produitTableau != null ){
      for (i=0; i< produitTableau.length; i++){
        console.log("test");
        if(produitTableau[i]._id== produitData._id && produitTableau[i].color == selects.value ){

        }
      }
    }
  });
  return (produitTableau = JSON.parse(localStorage.getItem("produit")));
};
