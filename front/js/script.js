fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        for(element of data){
            
        let newCard = document.createElement('a');
        newCard.setAttribute('href', `./product.html?id=${element._id}`);
        items.appendChild(newCard);

        let article = document.createElement('article');
        newCard.appendChild(article);

        let img = document.createElement('img');
        img.setAttribute('src', `${element.imageUrl}`);
        img.setAttribute('alt', `${element.altTxt}`);
        article.appendChild(img); 

        let title = document.createElement('h3')
        title.classList.add('productName');
        title.innerHTML = element.name;
        article.appendChild(title);

        let description = document.createElement('p');
        description.classList.add('productDescription');
        description.innerHTML = element.description;
        article.appendChild(description);
        }
    })
    