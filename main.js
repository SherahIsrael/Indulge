// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closecart = document.querySelector("#close-cart");

//Open Cart
cartIcon.onclick = () =>  {
    cart.classList.add("active");
}
//Close Cart
closecart.onclick = () =>  {
    cart.classList.remove("active");
}


//Cart Working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
}

//Making Function
function ready() {
    //Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add To Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //Buy Button
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}
//Buy Button
function buyButtonClicked() {
    alert("Your order is placed");
    var cartContent = document.getElementdByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//Remove Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNAN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

// Add to cart
function addCartClicked(event) {
    var button = event.target;
    var menuItems = button.parentElement;
    var title = menuItems.getElementsByClassName("product-title")[0].innerText;
    var price = menuItems.getElementsByClassName("price")[0].innerText;
    var productImage = menuItems.getElementsByClassName("product-image")[0].src;
    addProductToCart(title, price, productImage);
    updatetotal();
}

function addProductToCart(title, price, productImage) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content");
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already added this item to your basket");
            return;
        }
        
    }
    
}

var cartBoxContent = `
                        <img src="${productImage}" alt="" class="cart-image">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity" />
                        </div>
                        <!-- Remove the Cart -->
                        <i class='bx bxs-trash cart-remove'></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

//Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("£", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // if price Contain some penny value
        total = Math.round(total * 100) / 100;

        document, getElementsByClassName("total-price")[0].innerText = "£" + total;
    
}
