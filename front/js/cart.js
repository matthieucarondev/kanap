let cart = localStorage.getItem("cart");
const url = "http://localhost:3000/api/products/";
const getCart = () => {
  let LS = [];
  if (localStorage.getItem(`cart`) != null) {
    LS = JSON.parse(localStorage.getItem(`cart`));
  }
  return LS;
};
//afficher produit

async function displayItem() {
  let LS = getCart();
  let quantityTotal = 0;
  let priceTotal = 0;
  if (cart != null) {
    for (let i = 0; i < LS.length; i++) {
      const id = LS[i].id;
      const color = LS[i].color;
      const item = document.querySelector(`#cart__items`);
      const apiUrl = url + id;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        let produitErr = `<article class="cart__item">
    <spam>Il y a une erreur avec un produit du panier!</spam> </article>`;
        const parser = new DOMParser();
        const displayProduitErr = parser.parseFromString(
          produitErr,
          "text/html",
        );
        item.appendChild(displayProduitErr.body.firstChild);
      } else {
        const data = await response.json();
        const dom = new DOMParser();
        const produitItems = `<article class="cart__item" data-id="${id}" data-color="${color}">
                            <div class="cart__item__img">
                                <img src="${data.imageUrl}" alt="${data.altTxt}">
                            </div>
                            
                            <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${data.name}</h2>
                                    <p>Couleur : ${color}</p>
                                    <p data-id="price-${id}-${color}">Prix : ${data.price} €</p>
                                </div>
                                
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p>Qté : </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQty('${id}', '${color}', '${data.price}', this.value)" min="1" max="100" value="${LS[i].qty}">
                                    </div>
                                
                                    <div class="cart__item__content__settings__delete">
                                        <p class="deleteProduit" onclick="deleteProduit('${id}', '${color}', '${data.price}','${LS[i].qty}')">Supprimer</p>
                                    </div>
                                </div>
                            </div>
                        </article>`;
        const cartItems = dom.parseFromString(produitItems, "text/html");
        item.appendChild(cartItems.body.firstChild);
        // Afficher le prix total
        priceTotal += data.price * LS[i].qty;
        document.querySelector("#totalPrice").innerHTML = priceTotal;

        // Afficher la quantité totale
        quantityTotal += parseInt(LS[i].qty);
        document.querySelector("#totalQuantity").innerHTML = quantityTotal;
      }
    }
  } else {
    document.querySelector(`h1`).innerText = `Le panier est vide !`;
    document.querySelector("#totalQuantity").innerText = `0`;
    document.querySelector("#totalPrice").innerText = `0`;
  }
}
// Fonction pour changer la quantité
const changeQty = (id, color, price, newQty) => {
  let LS = getCart();
  let item = LS.find((LS) => id === LS.id && color === LS.color);

  let oldQuantity = item.qty;
  let qtyNew = parseInt(newQty);
  item.qty = qtyNew;
  localStorage.setItem("cart", JSON.stringify(LS));
  let oldTotalQty = parseInt(
    document.querySelector(`#totalQuantity`).innerHTML,
  );
  //erreur quantity  non compris entre 1 et 100
  if (newQty <= 0 || newQty >= 101) {
    alert(`la quantité d'un produit doit être comprise entre 1 et 100`);
  }
  //modifier quantité total
  let newQtyTotal = oldTotalQty - oldQuantity + qtyNew;
  document.querySelector(`#totalQuantity`).innerHTML = newQtyTotal;

  let priceProduit = parseInt(price);
  let oldTotalPrice = parseInt(document.querySelector(`#totalPrice`).innerHTML);
  let newTotalPrice =
    oldTotalPrice - priceProduit * oldQuantity + priceProduit * qtyNew;
  document.querySelector(`#totalPrice`).innerHTML = newTotalPrice;
};
function addQuantityToSettings(id, color, price) {
  const input = document.querySelector(
    `article[data-id="${id}"][data-color="${color}]`,
  );
  input.addEventListener("input", () =>
    updatePriceAndQuantity(item.id, input.value, item, price),
  );
}
//suppression de produit //
const deleteProduit = (id, color, price, qty) => {
  let LS = getCart();
  for (let i = 0; i < LS.length; i++) {
    if (id === LS[i].id && color === LS[i].color) {
      LS.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(LS));

      let itemToDelete = document.querySelector(
        `.cart__item[data-id="${id}"][data-color="${color}"]`,
      );
      itemToDelete.setAttribute("style", "display:none");

      //modif qty localstorage
      let deletQTY = qty;
      localStorage.setItem("cart", JSON.stringify(LS));
      //Modif qty total
      let oldTotalQty = parseInt(
        document.querySelector(`#totalQuantity`).innerHTML,
      );
      let newQtyTotal = oldTotalQty - deletQTY;
      document.querySelector(`#totalQuantity`).innerHTML = newQtyTotal;

      //modi prix total*
      let priceProduit = parseInt(price);
      let oldTotalPrice = parseInt(
        document.querySelector(`#totalPrice`).innerHTML,
      );
      let nexTotalPrice = oldTotalPrice - priceProduit * deletQTY;
      document.querySelector(`#totalPrice`).innerHTML = nexTotalPrice;
      if (LS.length == 0) {
        document.querySelector("h1").innerText = "Le panier est vide!!";
        return alert("le panier est vide !!");
      }
    }
  }
};
displayItem();
