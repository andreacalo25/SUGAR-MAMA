document.addEventListener('DOMContentLoaded', function() {
    const productDetails = {
        "Candies and Candles": {
            title: "CANDIES AND CANDLES",
            description: "A box of candy to distract you from the advancing years, ideal for celebrating a birthday with a shower of sweetness. When choosing candies you can choose a custom package on which to add greetings, aphorisms and photos of the birthday guests.",
            reviews: "★★★★ 2638 Reviews"
        },
        "Sweet Sweet Love": {
            title: "SWEET SWEET LOVE",
            description: "A mix of chocolates and themed candies where you can hide a tearful note. The perfect gift for Valentine’s Day, anniversaries or to say I love you in a sweet way. A romantic mix to surprise your better half. ",
            reviews: "★★★★★ 8763 Reviews"
        },
        "Don't tell the Doctor": {
            title: "DON'T TELL THE DOCTOR",
            description: "A book-shaped box to hide the favorite candy of the recent graduate and the favors for friends and relatives, personalized with memes and embarrassing photos of the new doctor or doctor. After all that studying, it takes a sweet treat.",
            reviews: "★★★★★ 7899 Reviews"
        },
        "Exotic Experiences": {
            title: "EXOTIC EXPERIENCES",
            description: "A selection of the strangest and most bizarre candies, ready to surprise you. Ideal for those who love to experience new tastes and culinary adventures. Perfect for giving a taste of tropical paradise in every bite.",
            reviews: "★★★ 1678 Reviews"
        },
    };

    const selectedFlavor = localStorage.getItem('giftboxSelectedFlavor');
    const selectedTheme = localStorage.getItem('giftboxSelectedTheme');
    const savedTheme = localStorage.getItem('theme'); // Recupera il tema chiaro/scuro

    if (selectedFlavor && selectedTheme) {
        const selectedElement = document.querySelector(`.flavors img[data-flavor="${selectedFlavor}"]`);
        if (selectedElement) {
            selectedElement.classList.add('clicked');
            document.body.classList.add(selectedTheme);
            document.getElementById('product-image').src = selectedElement.src;
            document.getElementById('product-title').textContent = productDetails[selectedFlavor].title;
            document.getElementById('product-description').innerHTML = productDetails[selectedFlavor].description;
            document.querySelector('.reviews span').textContent = productDetails[selectedFlavor].reviews;
        }
    }

    if (savedTheme === 'dark') {
        document.getElementById('dark-theme').disabled = false;
    } else {
        document.getElementById('dark-theme').disabled = true;
    }

    document.querySelectorAll('.flavors img').forEach(img => {
        img.addEventListener('click', function() {
            const flavor = this.getAttribute('data-flavor');
            const theme = this.getAttribute('data-theme');
            localStorage.setItem('giftboxSelectedFlavor', flavor);
            localStorage.setItem('giftboxSelectedTheme', theme);
            document.body.className = ''; // Rimuovi tutte le classi del body
            document.body.classList.add(theme); // Aggiungi la classe del tema selezionato

            document.querySelectorAll('.flavors img').forEach(i => i.classList.remove('clicked')); // Rimuovi la classe clicked da tutte le immagini
            this.classList.add('clicked'); // Aggiungi la classe clicked all'immagine selezionata

            document.getElementById('product-image').src = this.src;
            document.getElementById('product-title').textContent = productDetails[flavor].title;
            document.getElementById('product-description').innerHTML = productDetails[flavor].description;
            document.querySelector('.reviews span').textContent = productDetails[flavor].reviews;
        });
    });

    document.getElementById('decrease-quantity').addEventListener('click', function() {
        const quantityInput = document.getElementById('quantity');
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
        }
    });

    document.getElementById('increase-quantity').addEventListener('click', function() {
        const quantityInput = document.getElementById('quantity');
        let quantity = parseInt(quantityInput.value);
        quantity++;
        quantityInput.value = quantity;
    });

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    window.openCart = function() {
        document.getElementById("sidebar-cart").style.width = "350px";
        document.getElementById("cart-overlay").style.display = "block";
        renderCart();
    }

    window.closeCart = function() {
        document.getElementById("sidebar-cart").style.width = "0";
        document.getElementById("cart-overlay").style.display = "none";
    }

    function addToCart(product) {
        const cartItem = cart.find(item => item.name === product.name);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        updateCartCount();
        renderCart();
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    window.removeFromCart = function(productName) {
        cart = cart.filter(item => item.name !== productName);
        updateCartCount();
        renderCart();
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').innerText = cartCount;
    }

    function updateCartTotal() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById('cart-subtotal').innerText = `€${subtotal.toFixed(2)}`;
    }

    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Price: €${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: €${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <span class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</span>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        updateCartTotal();
    }

    document.querySelector('.add-to-cart').addEventListener('click', function() {
        const product = {
            name: document.getElementById('product-title').innerText,
            price: 13.00, // Puoi cambiare il prezzo come necessario
            quantity: parseInt(document.getElementById('quantity').value),
            image: document.getElementById('product-image').src
        };
        addToCart(product);
    });

    window.continueShopping = function() {
        closeCart();
    }

    window.checkout = function() {
        alert('Proceeding to checkout');
    }

    // Funzione per il cambio tema
    window.switchTheme = function() {
        const darkThemeLink = document.getElementById('dark-theme');
        if (darkThemeLink.disabled) {
            darkThemeLink.disabled = false;
            localStorage.setItem('theme', 'dark');
        } else {
            darkThemeLink.disabled = true;
            localStorage.setItem('theme', 'light');
        }
    }
});
