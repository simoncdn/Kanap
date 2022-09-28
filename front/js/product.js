let queryString = window.location.search;
let id = queryString.slice(4);


let colors_place = document.getElementById("colors");
let sel_colors = document.getElementsByTagName("option");

colors_place.remove(2);
colors_place.remove(1);

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
            colors_place.appendChild(color);
        }
    })
    .catch(err => {
        console.log(`une erreur est survenue ${err}`);
    })