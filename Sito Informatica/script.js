$(document).ready(function(){
    $('.carousel').slick({
        infinite: true,
        slidesToShow: 3.058,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
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

    $('.btn-cart').on('click', function() {
        const productElement = $(this).closest('.carousel-item');
        const product = {
            name: productElement.find('h3').text(),
            price: parseFloat(productElement.find('.price').text().replace('€', '')),
            image: productElement.find('.carousel-image').attr('src')
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

    // Applicare il tema salvato al caricamento della pagina
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.getElementById('dark-theme').disabled = false;
    } else {
        document.getElementById('dark-theme').disabled = true;
    }

    // Initialize cart on page load
    updateCartCount();
    renderCart();
});
