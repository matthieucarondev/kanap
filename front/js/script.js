const url = "http://localhost:3000/api/products";
const items = document.getElementById('items');

async function homeProduit()  {
  try {
  const response = await fetch(url);
  const data = await response.json()

        const dom = new DOMParser();
        
 

 for (i = 0; i < data.length; i ++) {
           const produitItems = 
          `<a href="./product.html?id=${data[i]._id}">
                    <article>
                        <img src="${data[i].imageUrl}" alt="${data[i].altTxt}" />
                        <h3 class="productName">${data[i].name}</h3>
                        <p class="productDescription">${data[i].description}</p>
                    </article>
                </a>`;
                 const cartItems = dom.parseFromString(produitItems, "text/html");
                  items.appendChild(cartItems.body.firstChild);
 }
     }catch(err) {
        items.innerText = `Oups ! Il y a eu une erreur lors de l'affichage des produits :(`;}
     }
homeProduit();