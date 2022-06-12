const elt1 = document.querySelector(".item__img");
const elt2 = document.getElementById("price");
const elt3 = document.getElementById("title");
const elt4 = document.getElementById("description");
const elt5 = document.getElementById("colors");

const search_params = new URLSearchParams(location.search);
const id = search_params.get("id");
async function kanap1() {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const data = await response.json();
    elt1.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    elt2.innerHTML = data.price;
    elt3.innerHTML = data.name;
    elt4.innerHTML = data.description;
    for (let color of data.colors) {
      elt5.innerHTML += `<option value="${color}">${color}</option>`;
    }
  } catch {
    elt1.innerHTML = "Error Loading Element";
  }
}
kanap1();

const elt6 = document.getElementById("addToCart");
elt6.addEventListener("click", function () {
  const quantite = Number(document.getElementById("quantity").value);

  if (!quantite || quantite > 100 || quantite < 1) {
    return alert("Veuillez choisir une quantité");
  } else if (!elt5.value) {
    return alert("Veuillez sélectionner une couleur");
  } else {
    const produitSelectionne = {
      id: id,
      couleur: elt5.value,
      quantite: quantite,
    };

    const product = JSON.parse(localStorage.getItem("product")) || [];
    const produitTrouve = product.find(
      (elt) =>
        elt.id == produitSelectionne.id &&
        elt.couleur == produitSelectionne.couleur
    );
    if (produitTrouve) {
      produitTrouve.quantite += produitSelectionne.quantite;
    } else {
      product.push(produitSelectionne);
    }
    localStorage.setItem("product", JSON.stringify(product));
    popUp();
  }
});

function popUp() {
  if (
    window.confirm(`Un objet a bien été ajouté au panier
  Si vous voulez consulter le panier appuyer sur OK ou vous voulez revenir à l'accueil appuyer sur ANNULER`)
  ) {
    window.location.href = "cart.html";
  } else {
    window.location.href = "index.html";
  }
}
