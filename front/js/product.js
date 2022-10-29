// Récupération de l'id du produit passer dans l'URL
let currentUrl = window.location.href;
let url = new URL(currentUrl);
const id = url.searchParams.get('id');

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

    const data = await res.json();
    newproductData = data;
    return newproductData;
}

// Affichage du produit
let colorsSelect = document.getElementById("colors");
colorsSelect.remove(2);
colorsSelect.remove(1);
async function displayProduct(){
    productData = await getProductData();

    document.querySelector("article div.item__img > img")
    .setAttribute('src', `${productData.imageUrl}`);
    document.querySelector("article div.item__img > img")
    .setAttribute('alt', `${productData.altTxt}`);

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

let btnAddToCart = document.querySelector("#addToCart");
let itemQuantity = document.querySelector("#quantity");

btnAddToCart.addEventListener('click', () => {

    let newProduct = {
        idProduct: id,
        quantity: itemQuantity.value,
        color: colorsSelect.value,
    }

    let storage = JSON.parse(localStorage.getItem("product"));

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
                }
            });

            if(productFound === false){
                storage.push(newProduct);
                localStorage.setItem("product", JSON.stringify(storage));
            }
            }else{
                storage = [];
                storage.push(newProduct);
                localStorage.setItem("product", JSON.stringify(storage));
            }
    }
})

