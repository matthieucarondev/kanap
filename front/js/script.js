
const url = "http://localhost:3000/api/products";

fetch(url)
 .then ((reponse) => reponse.json()
 .then((data) => {
        const parser = new DOMParser();
        const items = document.getElementById('items');
 

 for (i = 0; i < data.length; i ++) {
            let produitItems = 
          `<a href="./product.html?id=${data[i]._id}">
                    <article>
                        <img src="${data[i].imageUrl}" alt="${data[i].altTxt}" />
                        <h3 class="productName">${data[i].name}</h3>
                        <p class="productDescription">${data[i].description}</p>
                    </article>
                </a>`;
                 const cartItems = parser.parseFromString(produitItems, "text/html");
                  items.appendChild(cartItems.body.firstChild);
    
  }}))
  .catch((err) => 
        document.getElementById('items').innerText = `Oups ! Il y a eu une erreur lors de l'affichage des produits :(`);

  
