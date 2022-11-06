// Récupération de l'id du produit passer dans l'URL
let currentUrl = window.location.href;
// console.log(currentUrl);
let url = new URL(currentUrl);
// console.log(url);
const id = url.searchParams.get('id');
// console.log(id);

productData = [];
// Récupération des données du produit
async function getProductData(){
    let newproductData = [];
    const res = await fetch(`http://localhost:3000/api/products/${id}`)
    
    if (!res.ok) {
        console.log(`Il y a eu une erreur: ${err}`);
        alert("Probleme de connexion, Veuillez nous excuser.");
        return [];
    };

    newproductData = await res.json();
    return newproductData;
}

// Affichage du produit
let colorsSelect = document.getElementById("colors");
let itemImg = document.querySelector(".item__img");
async function displayProduct(){
    productData = await getProductData();

    let img = document.createElement("img");
    img.setAttribute('src', `${productData.imageUrl}`);
    img.setAttribute('alt', `${productData.altTxt}`);
    itemImg.appendChild(img);

    document.querySelector("#title")
    .textContent = `${productData.name}`

    document.querySelector("#description")
    .textContent = `${productData.description}`

    document.querySelector("#price")
    .textContent = `${productData.price}`

    for (let index = 0; index < productData.colors.length; index++) {
        const element = productData.colors[index];
        
        let color = document.createElement('option');
        color.setAttribute("value", `${element}`);
        color.innerHTML = `${element}`;
        colorsSelect.appendChild(color);
    }
}
displayProduct();

// LOCAL STORAGE // 

// Recupere les variables du DOM
let btnAddToCart = document.querySelector("#addToCart");
let itemQuantity = document.querySelector("#quantity");

// Ajoute l'evenement click sur le bouton
btnAddToCart.addEventListener('click', sendToLocalstorage);

// Envoit les données au localstorage
function sendToLocalstorage(){
    let newProduct = {
        idProduct: id,
        quantity: itemQuantity.value,
        color: colorsSelect.value,
    }
    let storage = JSON.parse(localStorage.getItem("product"));
    console.log(storage);
    if(itemQuantity.value <= 0 || itemQuantity.value > 100 || colorsSelect.value === ""){
        alert("Veuillez selectionner une couleur valide et une quantité comprise entre 1-100.");
    }else{
        if (storage) {
            let productFound = false;

            storage.forEach(element => {
            if(element.color === colorsSelect.value && element.idProduct === id){
                let elementNb = parseInt(element.quantity);
                let quantityNb = parseInt(itemQuantity.value);

                elementNb += quantityNb;
                element.quantity = elementNb.toString();

                localStorage.setItem("product", JSON.stringify(storage));
                productFound = true;
                
                console.log("La quantité a changer.");
                }
            });

            if(productFound === false){
                storage.push(newProduct);
                localStorage.setItem("product", JSON.stringify(storage));
                console.log("Ajout d'un nouvel article");
            }
        }else{
                storage = [];
                storage.push(newProduct);
                localStorage.setItem("product", JSON.stringify(storage));
                console.log("Premier article ajouter au panier");
        }
    }
}

