document.addEventListener('DOMContentLoaded', function() {
    const productDetails = {
        "Teddy Bears": {
            title: "TEDDY BEARS",
            description: "Adult life is hard, sometimes we need to be young kids again.",
            reviews: "★★★★★ 7938 Reviews"
        },
        "Frizzy Worms": {
            title: "FRIZZY WORMS",
            description: "They might seem scary, but they are only really sour.",
            reviews: "★★★★ 5877 Reviews"
        },
        "Rainbows": {
            title: "RAINBOWS",
            description: "They say at the end of the rainbow, you may find a pot of gold. Yes, but first of all you need to survive you day.",
            reviews: "★★★★★ 1898 Reviews"
        },
        "Self-love": {
            title: "SELF-LOVE",
            description: "Words of affirmation are important, these are also sweet and crunchy.",
            reviews: "★★★★★ 10472 Reviews"
        },
        "Red Liquorice": {
            title: "RED LIQUORICE",
            description: "Chewing liquorice is a great way to eliminate stress and calm nerves. Perfect to eat in the office.",
            reviews: "★★★ 6307 Reviews"
        },
        "Happy Hour": {
            title: "HAPPY HOUR",
            description: "Aperol Spritz flavored candies, you can eat them at 9 am without being called an alcoholic.",
            reviews: "★★★★ 2328 Reviews"
        },
        "On Cloud Nine": {
            title: "ON CLOUD NINE",
            description: "It's winter, it's cold but you have these and a cup of tea or hot chocolate, you deserve it.",
            reviews: "★★★★★ 15872 Reviews"
        },
        "Chocolate Coins": {
            title: "CHOCOLATE COINS",
            description: "You can separate them by color before eating them. OCD approved",
            reviews: "★★★★★ 14993 Reviews"
        }
    };

    const selectedFlavor = localStorage.getItem('shopSelectedFlavor');
    const selectedTheme = localStorage.getItem('shopSelectedTheme');
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
            localStorage.setItem('shopSelectedFlavor', flavor);
            localStorage.setItem('shopSelectedTheme', theme);
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
            cartItem.quantity += product.quantity;
        } else {
            cart.push({...product});
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
