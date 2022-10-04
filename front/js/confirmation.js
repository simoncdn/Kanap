let queryString = window.location.search;
let id = queryString.slice(4);

let orderId = document.getElementById("orderId");
orderId.innerHTML = id;
