fetch('http://localhost:3000/api/products')
    .then(res => {
    if(res.ok) {
        return res.json()
    }
    })
    .then(data => {
        for(element of data){

            let newCard = document.createElement('a');
            newCard.setAttribute('href', `./product.html?id=${element._id}`);
            newCard.innerHTML = `
            <article>
              <img src="${element.imageUrl}" alt="${element.altTxt}">
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">${element.description}</p>
            </article>
            `;
            items.appendChild(newCard);
        }
    })
    .catch(err => {
        console.error(`Une erreur est survenu ${err}`);
    })