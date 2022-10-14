let storage = JSON.parse(localStorage.getItem("product"));

let sumOfProductQuantity = 0;
let totalOfShoppingBag = 0;

let arrProduct = [];



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

            totalOfShoppingBag += data.price * parseInt(product.quantity);
            sumOfProductQuantity += parseInt(product.quantity);

            document.getElementById('totalPrice').innerHTML = totalOfShoppingBag;
            document.getElementById('totalQuantity').innerHTML = sumOfProductQuantity;

            arrProduct[data._id] = data;
            // allProducts = data;

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

    deleteItem.addEventListener("click", (e) => {
        let thisProduct = deleteItem.closest('article');
        console.log(product.idProduct);
        thisProduct.remove();
        newStorage = storage.filter(product => 
            product.idProduct !== storage[i].idProduct || product.color !== storage[i].color);
            localStorage.setItem("product", JSON.stringify(newStorage));
            location.reload();
            e.stopPropagation();
    })
}

let itemQuantity = document.querySelectorAll(".itemQuantity"); 
itemQuantity.forEach((item) => {
    item.addEventListener("change", (e) => {
        e.preventDefault();
        let newTotalQuantity = 0;
        let newTotalPrice = 0;
        let newTotalOfShoppingBag = 0;
        let selectProduct = storage.find(element => element.idProduct === item.closest('article').dataset.id && element.color === item.closest('article').dataset.color);
        if (item.value > 0 && item.value <= 100) {
            selectProduct.quantity = item.value;
            localStorage.setItem("product", JSON.stringify(storage));

            for (product of storage) {
                newTotalQuantity += parseInt(product.quantity);
                newTotalPrice = arrProduct[product.idProduct].price * product.quantity;
                newTotalOfShoppingBag += newTotalPrice;
            }
            document.getElementById("totalQuantity").innerHTML = newTotalQuantity;
            document.getElementById('totalPrice').innerHTML = newTotalOfShoppingBag;
        };
    });
});


// ORDER // 

let form = document.querySelector(".cart__order__form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (ValidateName(lastName) && ValidateFirstName(firstName) && ValidateAddress(address) && ValidateCity(city) && ValidateEmail(email)) {
        
        let contact = {
            lastName : document.getElementById("lastName").value,
            firstName : document.getElementById("firstName").value,
            address : document.getElementById("address").value,
            city : document.getElementById("city").value,
            email : document.getElementById("email").value,
        };
        
        let products = [];
        for (let i = 0; i < storage.length; i++) {
            products.push(storage[i].idProduct);
        };

        fetch ("http://localhost:3000/api/products/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({contact, products})
        })
        .then(res => res.json())
        .then(data => {
            document.location.href=`./confirmation.html?id=${data.orderId}`; 
        })

        localStorage.clear();
    }
});


function ValidateName(name){
    if(/^(?=.{1,20}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name.value))
    {
        return (true);
    }else{
        alert("Vous avez entré un nom invalide!")
        return(false);
    }
};
function ValidateFirstName(firstName){
    if(/^(?=.{1,20}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(firstName.value))
    {
        return (true);
    }else{
        alert("Vous avez entré un prénom invalide!")
        return(false);
    }
};

function ValidateAddress(address){
 if(/^[a-zA-Z0-9\s,'-]*$/.test(address.value)){
    return (true);
 }else{
    alert("Vous avez entré une adresse invalide!");
    return (false);
 }
};
function ValidateCity(city){
    if (/^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/.test(city.value)) {
        return (true);
    }else{
        alert("Vous avez entré un nom de ville invalide!")
        return (false);
    }
};
function ValidateEmail(emailAdress){
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAdress.value))
  {
    return (true);
  }else{
      alert("Vous avez entré une adresse email invalide!")
      return (false);
  }
};