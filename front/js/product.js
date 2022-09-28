let queryString = window.location.search;
console.log(queryString.slice(4));
let id = queryString.slice(4);

fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => res.json)
    .then(data => console.log(data));
