// On récupere les produits présent dans l'API
async function getAllProducts(){

    const res = await fetch('http://localhost:3000/api/products');

    if(!res.ok){
            onsole.log(`il y'a eu une erreur : ${err}`);
    }
    data = await res.json();
    productsData = data;

    return productsData;
}

// Affichage des cartes des produits
async function displayProducts(){
    let allProducts = await getAllProducts();
    
    allProducts.forEach(element => {   
        let productCard = document.createElement('a');

        productCard.setAttribute('href', `./product.html?id=${element._id}`);
        productCard.innerHTML = `
            <article>
              <img src="${element.imageUrl}" alt="${element.altTxt}">
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">${element.description}</p>
            </article>
            `;
        items.appendChild(productCard);
    });
}
displayProducts();