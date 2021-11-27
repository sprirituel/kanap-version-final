// Fonction récupération ID

function getArticleId() {
  return new URL(location.href).searchParams.get("id")
}

const articleId = getArticleId() 

fetch(`http://localhost:3000/api/products/${articleId}`)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {
    createArticle(value);  
    color(value); 
    createObject(value);
})
.catch(function(error) {
    // Une erreur est survenue
});

function createArticle(value) {

  // Image

  let articleImg = document.createElement("img");
  articleImg.classList.add("article-Img");
  articleImg = new Image (300, 500);
  articleImg.src = item__img.appendChild(articleImg).imgContent = value.imageUrl;

  // Nom produit

  let productName = document.createElement("h1");
  productName.classList.add("productName");

  title.appendChild(productName).textContent = value.name;


  // Prix produit

  let articlePrice = document.createElement("span");
  articlePrice.classList.add("article-price");

  price.appendChild(articlePrice).textContent = value.price/100;

  // Description produit

  let productDescription = document.createElement("p");
  productDescription.classList.add("product-description");

  description.appendChild(productDescription).textContent = value.description;

}

// Couleur produit

function color(value) {
  for (let i = 0; i < value.colors.length; i++) { // index 0, Condition, incrémentation de l'index

  var sel = document.getElementById("colors");

  var opt = document.createElement("option");
  opt.value = i+1;
  opt.text = "Couleur : " + value.colors[i];

  sel.add(opt, sel.options[i+1]);
  }
}

//-------------------Gestion du Panier


// Selection bouton ajouter panier
const btn_envoyerPanier = document.getElementById("addToCart");
btn_envoyerPanier.addEventListener("click", (event)=>{
    event.preventDefault();

    // Choix couleur
    const colorProd = document.getElementById("colors");
    const colorChoice = colorProd.value;

    // Choix quantité

    const quantityProd = document.getElementById("quantity");
    const quantityChoice = quantityProd.value;


    // Récuperation valeur produit
    // =========================================================================================================
  
    
    let products = {
      idProduit : articleId, 
      colors : colorChoice,
      quantite : quantityChoice,
    }

    let arrayProducts = []; // <<< variable pour stocker les articles en array

      //-------------------Le local Storage

      if (colorChoice == 0) {
        btn_envoyerPanier.innerHTML = "Choisissez une couleur !";
        return 0;
      }
      else{
        btn_envoyerPanier.innerHTML = "Produit ajouté au panier !";
                
        if(localStorage.length > 0) { // <<< le localStorage n'est pas vide, on appelle une fonction en passant le produit à ajouter en paramètre
          ajoutProduitLocalStorage(products); // <<< ici
          
         }else{
            arrayProducts.push(products); // <<< LocalStorage vide, on push le tableau
            localStorage.setItem ("produits", JSON.stringify(arrayProducts)) ;  // <<< on insère le tout dans le localStorage
         }    
      }  
 
  function ajoutProduitLocalStorage(products) {
        
    var articlesLocalStorage = JSON.parse(localStorage.getItem("produits")); // <<< on recupère le localStorage
         
    for(var i = 0; i < articlesLocalStorage.length; i++) { // <<< standard, on boucle dans le localStorage récupéré

      if (articlesLocalStorage[i].idProduit === products.idProduit && articlesLocalStorage[i].colors === products.colors){ // <<< Vérif si article et couleurs existantes 
        let QteArticlesLocalStorage = parseInt(articlesLocalStorage[i].quantite) + parseInt(products.quantite); // <<< Quantité modifiée
        articlesLocalStorage[i].quantite = QteArticlesLocalStorage; // <<< On colle tout ça dans la variable
        
        localStorage.setItem("produits", JSON.stringify(articlesLocalStorage)); // <<< Et on met ça dans le localstorage
        return 1;
      }
    }
    articlesLocalStorage.push(products);
    localStorage.setItem("produits", JSON.stringify(articlesLocalStorage));
  };
});







