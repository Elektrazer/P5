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
