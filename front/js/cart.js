const elt1 = document.getElementById("cart__items");
const produitTrouve = JSON.parse(localStorage.getItem("product"));

// Fonction permettant de récupérer les données du LocalStorage pour remplacer le HTML par le produit sélectionné
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
    kanap2();
    // Fonction permettant de changer la quantité depuis la page Panier
    const inputs = document.querySelectorAll(".itemQuantity");
    for (const input of inputs) {
      input.addEventListener("change", function (e) {
        const product = JSON.parse(localStorage.getItem("product"));
        const majQuantity = e.target.value;
        const produitSelectionne = {
          id: e.target.closest("article").dataset.id,
          couleur: e.target.closest("article").dataset.color,
        };
        const findProduct = product.find(
          (elt) =>
            elt.id == produitSelectionne.id &&
            elt.couleur == produitSelectionne.couleur
        );
        if (findProduct) {
          findProduct.quantite = Number(majQuantity);
          localStorage.setItem("product", JSON.stringify(product));
        }
        kanap2();
      });
    }
    // Fonction permettant de supprimer un article du panier
    const elt3 = document.querySelectorAll(".deleteItem");
    for (const supp of elt3) {
      supp.addEventListener("click", function (e) {
        const product = JSON.parse(localStorage.getItem("product"));
        const produitSelectionne = {
          id: e.target.closest("article").dataset.id,
          couleur: e.target.closest("article").dataset.color,
        };
        const findProduct = product.find(
          (elt) =>
            elt.id == produitSelectionne.id &&
            elt.couleur == produitSelectionne.couleur
        );
        if (findProduct) {
          product.splice(product.indexOf(findProduct), 1);
          localStorage.setItem("product", JSON.stringify(product));
          e.target.closest("article").remove();
        }
        kanap2();
      });
    }
    const submit = document.getElementById("order");
    submit.addEventListener("click", function (e) {
      e.preventDefault();
      const firstName = document.getElementById("firstName").value;
      validateFirstName();
    });
  } catch {
    elt1.innerHTML = "Error Loading Elements";
  }
}
kanap1();

async function kanap2() {
  try {
    const product = JSON.parse(localStorage.getItem("product"));
    let price = 0;
    let productTotal = 0;
    for (let kanap of product) {
      const response = await fetch(
        `http://localhost:3000/api/products/${kanap.id}`
      );
      const data = await response.json();
      price += data.price * kanap.quantite;
      productTotal += kanap.quantite;
    }
    const totalArticle = document.getElementById("totalQuantity");
    const totalPrice = document.getElementById("totalPrice");

    totalArticle.innerHTML = productTotal;
    totalPrice.innerHTML = price;
  } catch {}
}

function validateFirstName(firstName) {
  const firstNameReg = new RegExp(/[0-9]/);
  const validFirstName = firstNameReg.test(firstName);
  console.log(validFirstName);

  if (validFirstName == false) {
    alert("Prénom invalide");
  }
}

function validateLastName(lastName) {
  const lastNameReg = new RegExp(/^[A-zÀ-ú' -]+$/);
  const validLastName = lastNameReg.test(lastName);

  if (validLastName == false) {
    alert("Nom invalide");
  }
}

function validateAdress(adress) {
  const adressReg = new RegExp(/([0-9]{1,}) ?([A-zÀ-ú,' -. ]*)/);
  const validAdress = adressReg.test(adress);

  if (validAdress == false) {
    alert("Nom invalide");
  }
}

function validateEmail(email) {
  const emailReg = new RegExp(/^[A-z0-9-_.]{1,}[@][A-z-]{2,}[.][A-z]{2,}$/g);
  const validEmail = emailReg.test(email);

  if (validEmail == false) {
    alert("Nom invalide");
  }
}
// Détecter un événement positif (incrémentation de la quantité)

// créer une fonction qui permet de modifier l'état du nombre
// Créer une fonction de l'état de la quantité totale

// Détecter un événement négatif (diminution de la quantité)

// Créer une fonction qui permet de soustraire le nombre
// Créer une fonction de l'état de la quantité totale
