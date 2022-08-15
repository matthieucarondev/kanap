let meubledata = [];

const fetchMeuble = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promisse) => {
      meubledata = promisse;
      console.log(meubledata);
    });
};

const meubleDisplay = async () => {
  await fetchMeuble();

  document.getElementById("items").innerHTML = meubledata
    .map(
      (meuble) => `
    <a id="card${meuble._id}" class="Liens" >
  <article >
  <img src="${meuble.imageUrl}" alt="${meuble.altTxt}"/>
   <h3 class="productName">${meuble.name.toUpperCase()}</h3>
    <p class="productDescription">${meuble.description}</p>
  </article>
  </a>
  `
    )
    .join("");

  let liens = document.querySelectorAll(".Liens");
  console.log(liens);

  liens.forEach((lien) =>
    lien.addEventListener("click", () => {
      console.log(lien);

      window.location = `product.html?${lien.id}`;
    })
  );
};

meubleDisplay();
