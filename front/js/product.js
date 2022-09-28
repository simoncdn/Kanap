let queryString = window.location.search;
let id = queryString.slice(4);


let colorsSelect = document.getElementById("colors");


colorsSelect.remove(2);
colorsSelect.remove(1);

fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => {
        if (res.ok) {
            return res.json()
        }
    })
    .then(data => {

        document.querySelector("article div.item__img > img")
        .setAttribute('src', `${data.imageUrl}`);
        document.querySelector("article div.item__img > img")
        .setAttribute('alt', `${data.altTxt}`);
        
        document.getElementById("title")
        .innerHTML = (`${data.name}`);
        
        document.getElementById("price")
        .innerHTML = (`${data.price}`);
        
        document.getElementById("description")
        .innerHTML = (`${data.description}`);

        for (let i = 0; i < data.colors.length; i++) {

            let element = data.colors[i];

            let color = document.createElement('option');
            color.setAttribute("value", `${element}`);
            color.innerHTML = `${element}`;
            colorsSelect.appendChild(color);
        }
    })
    .catch(err => {
        console.log(`une erreur est survenue ${err}`);
    });


let btn_addToCart = document.getElementById("addToCart");
let itemQuantity = document.getElementById("quantity");

btn_addToCart.addEventListener('click', () => {
        
        let productImage = document.querySelector("article div.item__img > img"); 


        let newProduct = {
            id: id,
            quantity: itemQuantity.value,
            color: colorsSelect.value,
            image: productImage.src,
        }
        
        let storage = JSON.parse(localStorage.getItem("product"));
        
        // if(itemQuantity.value <= 0 || itemQuantity.value > 100){
        //     console.log("mauvaise valeur");
        // }

        if (storage) {
            for (let i = 0; i < storage.length; i++) {
                let element = storage[i];
               
                if (colorsSelect.value === element.color && id === element.id) {
                    element.quantity = element.quantity + itemQuantity.value;
                    console.log(element);
                    console.log("same");
                }else{
                    storage.push(newProduct);
                    localStorage.setItem("product", JSON.stringify(storage));
                }
            }

        
        }else{
            storage = [];
            storage.push(newProduct);
            localStorage.setItem("product", JSON.stringify(storage));
            console.log(storage);
        }


        // console.log(storage);

    })
