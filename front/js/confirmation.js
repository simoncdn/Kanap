// Récupération de l'id du produit passer dans l'URL
let currentUrl = window.location.href;
let url = new URL(currentUrl);
let orderId = url.searchParams.get("orderId");

// affichge de l'order-ID dans l'HTML
const txtOrderId = document.getElementById('orderId');
txtOrderId.textContent = orderId;
