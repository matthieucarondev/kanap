let addProduit = JSON.parse(localStorage.getItem("addProduit"));

//transfert panier si il existe
async function fetchbasket() {
  
  let qtyTotal = 0;
  let priceTotal = 0;
  if (addProduit != null) {
    for (let i = 0; i < addProduit.length; i++) {
      let id = addProduit[i].id;
      let color = addProduit[i].color;
      let basketCart = document.querySelector(`#cart__items`);
      let urlIdProduit = "http://localhost:3000/api/products/" + id;
      //affiché produit
      const response = await fetch(urlIdProduit);

      if (!response.ok) {
        let errProduit = `<article class="cart__item">
  <spam> Il y a une erreur dans votre panier!</spam></article>`;
        const dom = new DOMParser();
        const displayErrProduit = dom.parseFromString(errProduit, "text/html");
        basketCart.appendChild(displayErrProduit.body.firstChild);
      } else {
        const data = await response.json();
        const Dom = new DOMParser();
        const descrProduit = `<article class="cart__item" data-id="${id}" data-color="${color}">
                 <div class="cart__item__img">
                <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${color}</p>
                    <p data-id="price-${id}-${color}">Prix : ${data.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${addProduit[i].qty}">
                    </div>
                    <div cass="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick="deleteItem('${id}', '${color}', '${data.price}','${addProduit[i].qty}')>Supprimer</p>
                    </div>
                      </div>
               </div>
              </article>`;
        const displayProduitDescrition = Dom.parseFromString(
          descrProduit,
          "text/html"
        );
        basketCart.appendChild(displayProduitDescrition.body.firstChild);
        //quantité total
        qtyTotal += parseInt(addProduit[i].qty);
        document.querySelector("#totalQuantity").innerHTML = qtyTotal;
        // prix total
        priceTotal += data.price *addProduit[i].qty;
        document.querySelector("#totalPrice").innerHTML = priceTotal;
      }
    }
  } else {
    //message si panier vide
    document.querySelector(`h1`).innerText = `Votre panier est vide !`;
    //message si 0 quantité
    document.querySelector("#totalQuantity").innerHTML = "0";
    //message si 0 prix
    document.querySelector("#totalPrice").innerHTML = "0";
  }
}
fetchbasket();
