const elt1 = document.getElementById("items");
async function kanap1() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    for (let kanap of data) {
      elt1.innerHTML += `<a href="./product.html?id=${kanap._id}">
    <article>
      <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
      <h3 class="productName">${kanap.name}</h3>
      <p class="productDescription">${kanap.description}</p>
    </article>
  </a>`;
    }
  } catch {
    elt1.innerHTML = "Error Loading Elements";
  }
}
kanap1();
