const search_params = new URLSearchParams(location.search);
const id = search_params.get("orderid");

const elt1 = document.getElementById("orderId");
elt1.innerText = id;
