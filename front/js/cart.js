// Récuperation du local Storage
let storage = JSON.parse(localStorage.getItem("product"));

// Récupération des produits présents dans l'API
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

// Calcul de la quantitée totale des produits du panier
function totalQuantity(){
    let totalQuantity = 0;
    storage.forEach(product => {
        totalQuantity += parseInt(product.quantity)
    });
    document.getElementById("totalQuantity").innerText = totalQuantity;
}

// Calcul du prix total des produits du panier
function totalPrice(){
    let totalPrice = 0;
    storage.forEach(product => {
        totalPrice += allProductsData[product.idProduct].price * parseInt(product.quantity);
    });
    document.getElementById("totalPrice").innerText = totalPrice;
}

// Ajout de l'evenement de suppression d'un produit
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

// Recalcul de la nouvelle quantité aprés modification
function newTotalQuantity(){
    let newTotalQuantity = 0;
    for (product of storage) {
        newTotalQuantity += parseInt(product.quantity);
    }
    document.getElementById("totalQuantity").innerText = newTotalQuantity;
}

// Recalcul du nouveau prix apres modification
function newTotalPrice(){
    let newTotalPrice = 0;
    storage.forEach(product => {
        newPricePerProduct = allProductsData[product.idProduct].price * parseInt(product.quantity);
        newTotalPrice += newPricePerProduct;
    });
    document.getElementById('totalPrice').innerHTML = newTotalPrice;
}

// Ajout de l'evenement pour changer la quantite d'un produit
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

// Affichage des produits du storage sur la page panier
let allProductsData = [];
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


// FORM REGEX // 
// On recupere les elements du dom : input & errorMsg
let errorMsg = [...document.querySelectorAll(".cart__order__form__question > p")];
let inputs = [...document.querySelectorAll(".cart__order__form__question > input")];


const infoVerification = {
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    email: false,
}
// On définit la liste des regex a utilisé pour chaque partie du formulaire
const regexList = { 
    firstName: /^(?=.{1,20}$)[a-z]+(?:['_.\s][a-z]+)*$/i,
    lastName: /^(?=.{1,20}$)[a-z]+(?:['_.\s][a-z]+)*$/i,
    address: /^[a-zA-Z0-9\s,'-]*$/i,
    city: /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
}

// Traite les resultats qui ont échoués aux regex
function failedInputs(){
    const props = Object.keys(infoVerification);
    const failedInputs = props.filter(prop => !infoVerification[prop]);
    if(failedInputs != []){
        failedInputs.forEach(key => {
            const index = props.indexOf(key);
            if (inputs[index].value != "") {
                displayErr(index);
            }
        })
    }
}
// Affiche un message d'erreur
function displayErr(index){
    errorMsg[index].textContent = `Les données saisies ne sont pas corrects.`;
}

// Traite les resultats qui ont réussis les regex 
function successInputs(){
    const props = Object.keys(infoVerification);
    const successInputs = props.filter(prop => infoVerification[prop]);
    if(successInputs != []){
        successInputs.forEach(key => {
            const index = props.indexOf(key);

            if (inputs[index].value != "") {
                removeDisplayErr(index);
            }
        })
    }
}
// Supprime le message d'erreur
function removeDisplayErr(index){
    errorMsg[index].textContent = "";
}

//Passe les inputs correspondant aux regex de la liste
function regexTest(){
    let inputsValue = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    }
    for (const prop in inputsValue) {
        if (regexList[prop].test(inputsValue[prop])) {
            infoVerification[prop] = true;
        }
        else{
            infoVerification[prop] = false;
        }
    }
    failedInputs();
    successInputs();
}

// Ajout de l'evenement d'ecoute sur les inputs
// et appel la fonction RegexTest
function addInputEvent(inputs){
    inputs.forEach(input => {
        input.addEventListener("input", regexTest);
    });
}
addInputEvent(inputs);

// FORM ORDER // 
// Envoi de la commande
function sendCommand(){
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
        document.location.href=`./confirmation.html?orderId=${data.orderId}`; 
    })
}

// On recupere le formulaire du DOM
let form = document.querySelector(".cart__order__form");

// Ajout de l'evenement submit sur le formulaire
form.addEventListener("submit", handleForm);

// On parametre la condition d'envoit du formulaire
function handleForm(e){
    e.preventDefault();

    const keys = Object.keys(infoVerification)
    const successInputs = keys.filter(prop => infoVerification[prop]);

    if(successInputs.length === 5){
        sendCommand();
        localStorage.clear();
    }
}
