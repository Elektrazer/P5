const elt1 = document.getElementById("cart__items");
const produitTrouve = JSON.parse(localStorage.getItem("product"));

async function kanap1() {
  try {
    for (let kanap of produitTrouve) {
      const response = await fetch(
        `http://localhost:3000/api/products/${kanap.id}`
      );
      const data = await response.json();
      elt1.innerHTML += `<article class="cart__item" data-id="${kanap.id}" data-color="${kanap.couleur}">
      <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${data.name}</h2>
          <p>${kanap.couleur}</p>
          <p>${data.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${kanap.quantite}>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
    }
  } catch {
    elt1.innerHTML = "Error Loading Elements";
  }
}
kanap1();
