// 1- Recupération du bouton de differents elements
let carts = document.querySelectorAll('.add-cart');

// 2- Database des éléments 
let products = [
    {
        name: 'Grey Tshirt',
        tag: 'kid-01',
        price: 2000,
        inCart: 0
    },
        {
        name: 'Blue Tshirt',
        tag: 'kid-02',
        price: 4000,
        inCart: 0
    },
            {
        name: 'White Tshirt',
        tag: 'kid-03',
        price: 1500,
        inCart: 0
    },
                {
        name: 'Black Tshirt',
        tag: 'kid-04',
        price: 3000,
        inCart: 0
    }
]


// 3- Boucle sur les élements de la database
for (let i = 0; i < carts.length; i++) { 
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCoast(products[i]);
    })
}

// 4- Fonction pour ajouter les items au panier 
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers
    }
}

// 5- 
function cartNumbers(product) {   
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers)

    console.log(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1
        
    }

    setItems(product);
    

}

function setItems(product) { 
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)


    if (cartItems != null) { 
        
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        
        cartItems[product.tag].inCart += 1
    } else {
        product.inCart = 1
        cartItems = {
            [product.tag] : product
        }
    }

    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}


function totalCoast(product){
    // console.log('The product price is', product.price);
    let cartCost = localStorage.getItem('totalCoast')

    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCoast", cartCost+ product.price)
    } else {
        localStorage.setItem("totalCoast", product.price)
    }

    
}


function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector(".products")
    let cartCost = localStorage.getItem('totalCoast')

    console.log(productContainer);
    if (cartItems && productContainer) { 
        
        productContainer.innerHTML = '';
        // console.log(productContainer);

        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                
            <div class="product" >
                <ion-icon name="close-circle"></ion-icon>
                <img src = "./img/produits/enfants/${item.tag}.jpg" style="width: 50px;" >
                <span>${item.name}</span> 
            </div> 
            <div class="price">${item.price} FCFA</div>
            <div class="quantity">
                <ion-icon name="caret-back-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="caret-forward-circle"></ion-icon>
            </div>  
            <div class="total">
                ${item.inCart * item.price}
            </div>       
            `
            
        })

        productContainer.innerHTML += ` 
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    ${cartCost},00 
                </h4>
            </div>
        `

    }
    
}

onLoadCartNumbers()
displayCart()

