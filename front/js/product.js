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
  });
  addBasket(produitData);
};
produitDisplay();

const addBasket = () => {
  let bouton = document.getElementById(produitData._id);
  console.log(bouton);
  bouton.addEventListener("click", () => {
    let selects = document.getElementById("colors");
    console.log(selects);

  });
};
