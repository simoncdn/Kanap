let storage = JSON.parse(localStorage.getItem("product"));
let allProductsData = [];

async function getAllProductsData(){
    const productData = [];
    const res = await fetch(`http://localhost:3000/api/products`)

    if (!res.ok) {
        console.log(`Il y a eu une erreur : ${err}`);
        return [];
    }
    
    const data = await res.json();
    data.forEach(element => {
        productData[element._id] = element;
    });
    return productData;
}

function totalQuantity(){
    let totalQuantity = 0;
    storage.forEach(product => {
        totalQuantity += parseInt(product.quantity)
    });
    document.getElementById("totalQuantity").innerText = totalQuantity;
}

function totalPrice(){
    let totalPrice = 0;
    storage.forEach(product => {
        totalPrice += allProductsData[product.idProduct].price * parseInt(product.quantity);
    });
    document.getElementById("totalPrice").innerText = totalPrice;
}

function addDeleteProductEvent(){
    document.querySelectorAll(".deleteItem")
    .forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();

        let deleteProduct = document.querySelector(".deleteItem").closest("article");
        deleteProduct.remove();

        newStorage = storage.filter(product => 
            product.idProduct !== item.closest('article').dataset.id || product.color !== item.closest('article').dataset.color);
            localStorage.setItem("product", JSON.stringify(newStorage));
            location.reload();
            e.stopPropagation();
        })
    })
}
function newTotalQuantity(){
    let newTotalQuantity = 0;
    for (product of storage) {
        newTotalQuantity += parseInt(product.quantity);
    }
    document.getElementById("totalQuantity").innerText = newTotalQuantity;
}
function newTotalPrice(){
    let newTotalPrice = 0;
    storage.forEach(product => {
        newPricePerProduct = allProductsData[product.idProduct].price * parseInt(product.quantity);
        newTotalPrice += newPricePerProduct;
    });
    document.getElementById('totalPrice').innerHTML = newTotalPrice;
}
function addChangeQuantityEvent(){
    document.querySelectorAll(".itemQuantity")
    .forEach(item => {
        item.addEventListener("change", (e) => {
            e.preventDefault();
            let selectProduct = storage.find(element => element.idProduct === item.closest('article').dataset.id && element.color === item.closest('article').dataset.color);
            if (item.value > 0 && item.value <= 100) {
                selectProduct.quantity = item.value;
                localStorage.setItem("product", JSON.stringify(storage));

                newTotalQuantity();
                newTotalPrice();

            }else{
                console.log("remplissez une quantitée entre 1 et 100, Merci !");
            }
        })
    })
}
async function initDisplayProduct(){
    allProductsData = await getAllProductsData();

    storage.forEach(product => {
        const article = document.createElement("article");
        article.className = "cart__item";
        article.setAttribute("data-id", product.idProduct);
        article.setAttribute("data-color", product.color);
        article.innerHTML = `
        <div class="cart__item__img">
        <img src="${allProductsData[product.idProduct].imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${allProductsData[product.idProduct].name}</h2>
          <p>${product.color}</p>
          <p>${allProductsData[product.idProduct].price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
        </div>
        `;
        document.getElementById("cart__items").appendChild(article);
    });
    totalQuantity();
    totalPrice();
    addDeleteProductEvent();
    addChangeQuantityEvent();
}

initDisplayProduct();



