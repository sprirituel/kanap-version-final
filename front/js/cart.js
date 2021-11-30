let produitDansLocalStorage = JSON.parse(localStorage.getItem("produits"));

// Si le panier est vide

function createCart (produitDansLocalStorage) {
    if(produitDansLocalStorage === null) {
        let panierVide = document.createElement("p");
        panierVide.classList.add("panier-vide");

        cart__items.appendChild(panierVide).innerText = "Le panier est vide";

    // Si le panier contient des articles    
    }else{
        let produitPanier = [];
        for (let i = 0; i < produitDansLocalStorage.length; i++) { // index 0, Condition, incrémentation de l'index

            // Création article

            let article = document.createElement("article");
            article.classList.add("cart__item");

            cart__items.appendChild(article);

            // Création div img

            let divImg = document.createElement("div");
            divImg.classList.add("cart__item__img");

            article.appendChild(divImg);  

            // Création div cart item content
            
            let cartItemContent = document.createElement("div");
            cartItemContent.classList.add("cart__item__content");

            article.appendChild(cartItemContent);

            // Création cart__item__content__titlePrice

            let cartItemContentTitlePrice = document.createElement("div");
            cartItemContentTitlePrice.classList.add("cart__item__content__titlePrice");

            cartItemContent.appendChild(cartItemContentTitlePrice);

            // Création div cart__item__content__settings

            let cartItemContentSettings = document.createElement("div");
            cartItemContentSettings.classList.add("cart__item__content__settings");

            cartItemContent.appendChild(cartItemContentSettings);

            // Création div class="cart__item__content__settings__quantity

            let cartItemContentSettingsQuantity = document.createElement("div");
            cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")

            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

            // Quantité

            let quantity = document.createElement("p");
            cartItemContentSettingsQuantity.appendChild(quantity).textContent = "Qté : "

            //choix quantité

            let productQuantity = document.createElement("input");
            cartItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "item_quantity");
            productQuantity.value = produitDansLocalStorage[i].quantite;
            productQuantity.setAttribute("id", "qtt")

            //Bouton modifier la quantité

            let button = document.createElement("input")
            button.setAttribute('type', 'button');
            button.classList.add("button")

            cartItemContentSettingsQuantity.appendChild(button).value ="Changer la quantité";


            // div supprimer

            let cartItemContentSettingsDelete = document.createElement("div");
            cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");

            cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

            // deleteItem

            let deleteItem = document.createElement("p");
            deleteItem.classList.add("deleteItem");

            cartItemContentSettingsDelete.appendChild(deleteItem).textContent = "Supprimer";

            
            
            fetch(`http://localhost:3000/api/products/${produitDansLocalStorage[i].idProduit}`)
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function(value) {
                createArticle(value);  
            })
            .catch(function(error) {
                // Une erreur est survenue
            });

            //Fonction qui récupere les valeurs dans l'API

            function createArticle(value) {

                //IMG
                let articleImg = document.createElement("img");
                articleImg.classList.add("article-Img");
                articleImg = new Image (300, 300);
                articleImg.src = divImg.appendChild(articleImg).imgContent = value.imageUrl;

                //Nom du produit
                let productName = document.createElement("h2");
                cartItemContentTitlePrice.appendChild(productName).textContent = value.name;

                //Prix produit
                let productPrice = document.createElement("p")
                cartItemContentTitlePrice.appendChild(productPrice).textContent = value.price / 100 + " €"
            }
        }
    }
}

createCart (produitDansLocalStorage);

// total des quantités
let totalQuantity = 0 
if (produitDansLocalStorage != null) {
    for (let j = 0; j < produitDansLocalStorage.length; j++) {
        totalQuantity += parseInt(produitDansLocalStorage[j].quantite);

        document.getElementById("totalQuantity").textContent = totalQuantity;
    }

    // Prix total

    for (let k = 0; k < produitDansLocalStorage.length; k++) { // index 0, Condition, incrémentation de l'index

        fetch(`http://localhost:3000/api/products/${produitDansLocalStorage[k].idProduit}`)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            totalPrices(value);  
        })
        .catch(function(error) {
            // Une erreur est survenue
        });
        function totalPrices(value) {
            let totalPrice = 0 
            for (let j = 0; j < produitDansLocalStorage.length; j++) {
                totalPrice += parseInt(produitDansLocalStorage[j].quantite) * parseInt(value.price);

                document.getElementById("totalPrice").textContent = totalPrice / 100;
            }
        }
    }
}


 //bouton modifier quantité

let btnQuantité = document.querySelectorAll(".button");
let modifyQtt = document.querySelectorAll(".itemQuantity");
var articlesLocalStorage = JSON.parse(localStorage.getItem("produits")); // <<< on recupère le localStorage
for (let l = 0; l < modifyQtt.length; l++) {
    btnQuantité[l].addEventListener("click" , (event) => {

        let qttModifValue = modifyQtt[l].valueAsNumber;

        articlesLocalStorage[l].quantite = qttModifValue;

        localStorage.setItem("produits", JSON.stringify(articlesLocalStorage));

        window.location.reload(true);

    })
}


 // bouton supprimer 

const btnSupprimer = document.getElementsByClassName("deleteItem");
//var articlesLocalStorage = JSON.parse(localStorage.getItem("produits")); // <<< on recupère le localStorage
    
for (let j = 0; j < btnSupprimer.length; j++) {
    btnSupprimer[j].addEventListener("click" , (event) => {

        var elementSupprimer = articlesLocalStorage.splice(j, 1); // on supprime en partant de l'élément J, et on supprime 1 élément
        localStorage.setItem("produits", JSON.stringify(articlesLocalStorage));
        window.location.reload(true);
    })
}

// ------------------ Récupération des données du formulaire---------------

const btnFormulaire = document.getElementById("order");
btnFormulaire.addEventListener("click", (event)=>{
    event.preventDefault();

    const contact = {
        firstName : document.getElementById("firstName").value,
        lastName : document.getElementById("lastName").value,
        address : document.getElementById("address").value,
        city : document.getElementById("city").value,
        email : document.getElementById("email").value,
    }

    //  ----------------- Validation du formulaire--------------------
    // Le prénom
    const lePrenom = contact.firstName;
    if(/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(lePrenom)){

    }else{
        contact.firstName = 0
        alert("Pour le prénom des lettres en minuscules ou majuscules compris entre 3 et 20 caractères")
    }

    // Le nom
    const leNom = contact.lastName;
    if(/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(leNom)){

    }else{
        contact.lastName = 0
        alert("Pour le nom des lettres en minuscules ou majuscules compris entre 3 et 20 caractères")
    }

    // L'adresse
    const ladresse = contact.address;
    if(/^([A-Za-z0-9\s]{3,50})?([-]{0,1})?([A-Za-z0-9\s]{3,50})$/.test(ladresse)){

    }else{
        contact.address = 0
        alert("Pour l'adresse des lettres et chiffre compris entre 3 et 50 caractères")
    }

    // La ville
    const laVille = contact.city;
    if(/^[A-Za-z\s]{3,30}$/.test(laVille)){

    }else{
        contact.city = 0;
        alert("Pour la ville des lettres en minuscules ou majuscules compris entre 3 et 30 caractères")

    }

    const mail = contact.email
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)){
    
    }else{
        contact.email = 0
        alert("Merci de rentrer une adresse Email valide")
    }

    if (contact.city != 0 && contact.firstName != 0 && contact.lastName != 0 && contact.address != 0 && contact.email != 0) {
        // Mettre l'objet formulaireValues dans le local storage
        localStorage.setItem("formulaire", JSON.stringify(contact))


        const envoyer = {
            contact,
            products: produitDansLocalStorage.map(e=>e.idProduit),
        }

    
        // Envoie des données vers le serveur

        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(envoyer),
        })
        .then(function(res) {
            return res.json()
        })

        .then(function(res){
            localStorage.setItem("orderId", JSON.stringify(res.orderId))
            window.location.replace(`confirmation.html`)
        })
        .catch(function(error){
            console.log(error)
        })     
    }
})
