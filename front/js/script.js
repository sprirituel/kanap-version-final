fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {
    createArticle(value);
    console.log(value)   
})
.catch(function(error) {
    // Une erreur est survenue
});
       
function createArticle(value) {
    for (let i = 0; i < value.length; i++) { // index 0, Condition, incrémentation de l'index

        // Création a

        let a = document.createElement("a");
        a.classList.add("a");

        items.appendChild(a).href =`product.html?id=${value[i]._id}`;

        // Création article

        let article = document.createElement("article");
        article.classList.add("article");

        a.appendChild(article);

        // Création Balise img

        let articleImg = document.createElement("img");
        articleImg.classList.add("article-Img");
        articleImg = new Image (800, 800);
        articleImg.src = article.appendChild(articleImg).imgContent = value[i].imageUrl;

        // Création h3 productName

        let productName = document.createElement("h3");
        productName.classList.add("productName");

        article.appendChild(productName).textContent = value[i].name;


        // Création p description

        let productDescription = document.createElement("p");
        productDescription.classList.add("product-description");

        article.appendChild(productDescription).textContent = value[i].description;

    }
}