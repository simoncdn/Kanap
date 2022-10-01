let storage = JSON.parse(localStorage.getItem("product"));

let sumOfProductQuantity = 0;
let totalOfShoppingBag = 0;

for (let i = 0; i < storage.length; i++) {
    
    let product = storage[i];

    fetch(`http://localhost:3000/api/products/${product.idProduct}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(data => {
            img.setAttribute("src",`${data.imageUrl}`);
            name.innerHTML = `${data.name}`;
            price.innerHTML = `${data.price} €`;

            totalPerPrice = data.price * parseInt(product.quantity);
            totalOfShoppingBag += totalPerPrice;

            document.getElementById('totalPrice').innerHTML = totalOfShoppingBag;

        })
        .catch(err => {
            console.log(`une erreur est survenue ${err}`);
        });
   
    let newCart = document.createElement('article');
    newCart.setAttribute("class", "cart__item");
    newCart.setAttribute("data-id", `${product.idProduct}`);
    newCart.setAttribute("data-color", `${product.color}`);
    cart__items.appendChild(newCart);

    let div_img = document.createElement('div');
    div_img.setAttribute("class", "cart__item__img");
    newCart.appendChild(div_img);

    let img = document.createElement('img');
    div_img.appendChild(img);
        
    let cartContent = document.createElement('div');
    cartContent.setAttribute("class", "cart__item__content");
    newCart.appendChild(cartContent);

    let cartContentDescription = document.createElement('div');
    cartContentDescription.setAttribute("class", "cart__item__content__description");
    cartContent.appendChild(cartContentDescription);

    let name = document.createElement('h2');
    cartContent.appendChild(name);

    let color = document.createElement('p');
    color.innerHTML = product.color;
    cartContent.appendChild(color);

    let price = document.createElement('p');
    cartContent.appendChild(price);

    let cartContentSettings = document.createElement('div');
    cartContentSettings.setAttribute("class", "cart__item__content__settings");
    cartContent.appendChild(cartContentSettings);

    let cartContentQuantity = document.createElement('div');
    cartContentQuantity.setAttribute("class", "cart__item__content__settings__quantity");
    cartContentSettings.appendChild(cartContentQuantity);

    let quantity = document.createElement('p');
    quantity.innerHTML = "Qté : ";
    cartContentQuantity.appendChild(quantity);

    let quantityInput = document.createElement('input');
    quantityInput.setAttribute("type" ,"number");
    quantityInput.setAttribute("class" ,"itemQuantity");
    quantityInput.setAttribute("min" ,"1");
    quantityInput.setAttribute("max" ,"100");
    quantityInput.setAttribute("value" ,`${product.quantity}`);
    cartContentQuantity.appendChild(quantityInput);

    let cartContentDelete = document.createElement('div');
    cartContentDelete.setAttribute("class", "cart__item__content__settings__delete");
    cartContentSettings.appendChild(cartContentDelete);

    let deleteItem = document.createElement('p');
    deleteItem.setAttribute("class", "deleteItem");
    deleteItem.innerHTML = "Supprimer";
    cartContentDelete.appendChild(deleteItem);


    sumOfProductQuantity += parseInt(product.quantity);
    document.getElementById('totalQuantity').innerHTML = `${sumOfProductQuantity}`;

    quantityInput.addEventListener("change", () => {
        product.quantity = quantityInput.value;
        localStorage.setItem("product", JSON.stringify(storage));
        location.reload();
    });
    
    deleteItem.addEventListener("click", () => {
        let thisProduct = deleteItem.closest('article');
        console.log(product.idProduct);
        thisProduct.remove();
        newStorage = storage.filter(product => 
            product.idProduct !== storage[i].idProduct || product.color !== storage[i].color);
        localStorage.setItem("product", JSON.stringify(newStorage));
        location.reload();
    })
    
}

