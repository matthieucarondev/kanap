
let addProduit = JSON.parse(localStorage.getItem("produit"));
console.log(addProduit);
console.log("addProduit");

const panierDisplay = async () => {
    if(addProduit){
        await addProduit;
        console.log(addProduit);
    };
  cart__items.innerHTML = addProduit.map(
    (produit) =>
      `
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                 <div class="cart__item__img">
                <!-- <img src="../images/product01.jpg" alt="Photographie d'un canapé">-->
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <!--  <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>-->
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="--">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
`
  );
};
panierDisplay();
   // await fetch