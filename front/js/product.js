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
   
  let H1 = document.getElementById("title");
  H1.innerHTML+=`${produitData.name}`;

  let Price = document.getElementById("price");
  Price.innerHTML+=`${produitData.price}`;
};



 produitDisplay();
