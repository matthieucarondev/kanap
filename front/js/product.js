

const produit = window.location.search.split("?card").join("");
console.log(produit);

let produitData = [];

const fetchProduit = async () => {
  await fetch(`http://localhost:3000/api/products/${produit}`)
    .then((res) => res.json())
    .then((promise) => {
      produitData = promise;
      console.log(promise);
    });
};
const produitDisplay = async () => {
  await fetchProduit();

  document.querySelector("img").innerHTML = `
  <img src="${produitData.imageUrl}" alt="${produitData.altTxt}"/>`;

  let H1 = document.querySelector("#title");
  H1.innerHTML += `${produitData.name}`;

  let Price = document.querySelector("#price");
  Price.innerHTML += `${produitData.price}`;

  let descr = document.querySelector("#description");
  descr.innerHTML += `${produitData.description}`;

  let select = document.querySelector("#colors");

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

   
  });
  return (produitTableau = JSON.parse(localStorage.getItem("produit")));
};
