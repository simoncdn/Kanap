let storage = JSON.parse(localStorage.getItem("product"));
console.log(storage);

let productData = {};




for (let i = 0; i < storage.length; i++) {

    let product = storage[i];
        
        let newCart = document.createElement('article');
        newCart.setAttribute("class", "cart__item");
        newCart.setAttribute("data-id", `${product.id}`);
        newCart.setAttribute("data-color", `${product.color}`);
        cart__items.appendChild(newCart);

        let div_img = document.createElement('div');
        div_img.setAttribute("class", "cart__item__img");
        newCart.appendChild(div_img);

        let img = document.createElement('img');
        img.setAttribute("src",`${product.image}`);
        div_img.appendChild(img);
        
        let cartContent = document.createElement('div');
        cartContent.setAttribute("class", "cart__item__content");
        newCart.appendChild(cartContent);

        let cartContentDescription = document.createElement('div');
        cartContentDescription.setAttribute("class", "cart__item__content__description");
        cartContent.appendChild(cartContentDescription);

        // let title = document.createElement('h2');
        // title.innerHTML = product.
        // cartContent.appendChild(title);


        // let img = document.createElement('img');
        // img.setAttribute('src', `${element.imageUrl}`);
        // img.setAttribute('alt', `${element.altTxt}`);
        // article.appendChild(img); 

        // let title = document.createElement('h3')
        // title.classList.add('productName');
        // title.innerHTML = element.name;
        // article.appendChild(title);

        // let description = document.createElement('p');
        // description.classList.add('productDescription');
        // description.innerHTML = element.description;
        // article.appendChild(description);
 

}