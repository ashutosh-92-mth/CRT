<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>blinkit - Groceries in Minutes</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

<!-- ================= NAVBAR ================= -->

<header class="navbar">

    <div class="logo">blink<span>it</span></div>

    <div class="location">
        <small>Delivery in</small>
        <strong>10 minutes</strong>
        <span>⌄</span>
    </div>

    <div class="search-box">
        <span>🔍</span>
        <input
            type="text"
            id="searchInput"
            placeholder='Search "milk", "bread", "chips"...'
        >
    </div>

    <button class="login-btn">Login</button>

    <button class="cart-btn">
        🛒 Cart
        <b id="cartCount">0</b>
    </button>

</header>


<!-- ================= MOBILE SEARCH ================= -->

<div class="mobile-search">
    <span>🔍</span>
    <input type="text" placeholder="Search products">
</div>


<!-- ================= MAIN ================= -->

<main>

    <!-- HERO -->

    <section class="hero">

        <div class="hero-content">

            <p class="small-title">FAST DELIVERY • FRESH PRODUCTS</p>

            <h1>
                Groceries delivered
                <span>in minutes.</span>
            </h1>

            <p class="hero-text">
                Fresh groceries, snacks, beverages and daily essentials
                delivered right to your doorstep.
            </p>

            <button class="shop-btn" onclick="scrollProducts()">
                Shop Now →
            </button>

        </div>

        <div class="hero-image">
            🛵
        </div>

    </section>


    <!-- CATEGORIES -->

    <section class="section">

        <div class="section-heading">
            <h2>Shop by category</h2>
            <a href="#">View all →</a>
        </div>

        <div class="categories">

            <div class="category">
                <div class="category-img">🥛</div>
                <p>Dairy & Bread</p>
            </div>

            <div class="category">
                <div class="category-img">🍎</div>
                <p>Fruits & Vegetables</p>
            </div>

            <div class="category">
                <div class="category-img">🍪</div>
                <p>Snacks</p>
            </div>

            <div class="category">
                <div class="category-img">🥤</div>
                <p>Cold Drinks</p>
            </div>

            <div class="category">
                <div class="category-img">🍚</div>
                <p>Atta & Rice</p>
            </div>

            <div class="category">
                <div class="category-img">🧴</div>
                <p>Personal Care</p>
            </div>

            <div class="category">
                <div class="category-img">🧹</div>
                <p>Cleaning</p>
            </div>

            <div class="category">
                <div class="category-img">🐶</div>
                <p>Pet Supplies</p>
            </div>

        </div>

    </section>


    <!-- BANNER -->

    <section class="offer">

        <div>
            <p>LIMITED TIME OFFER</p>

            <h2>
                Fresh groceries.<br>
                Better prices.
            </h2>

            <button>Explore Deals →</button>
        </div>

        <div class="offer-icons">
            🥦 🍅 🍌 🥕
        </div>

    </section>


    <!-- PRODUCTS -->

    <section class="section products-section" id="products">

        <div class="section-heading">
            <h2>Best sellers</h2>
            <a href="#">See all →</a>
        </div>

        <div class="products" id="productsContainer">

            <!-- PRODUCT 1 -->

            <div class="product-card" data-name="amul milk">

                <div class="product-image">🥛</div>

                <span class="delivery">10 MIN</span>

                <h3>Amul Taaza Milk</h3>

                <p class="quantity">1 L</p>

                <div class="product-bottom">

                    <strong>₹64</strong>

                    <button onclick="addToCart('Amul Milk',64)">
                        ADD
                    </button>

                </div>

            </div>


            <!-- PRODUCT 2 -->

            <div class="product-card" data-name="lays chips">

                <div class="product-image">🥔</div>

                <span class="delivery">10 MIN</span>

                <h3>Lay's Classic Chips</h3>

                <p class="quantity">50 g</p>

                <div class="product-bottom">

                    <strong>₹20</strong>

                    <button onclick="addToCart('Lays Chips',20)">
                        ADD
                    </button>

                </div>

            </div>


            <!-- PRODUCT 3 -->

            <div class="product-card" data-name="banana">

                <div class="product-image">🍌</div>

                <span class="delivery">10 MIN</span>

                <h3>Fresh Banana</h3>

                <p class="quantity">6 pcs</p>

                <div class="product-bottom">

                    <strong>₹45</strong>

                    <button onclick="addToCart('Banana',45)">
                        ADD
                    </button>

                </div>

            </div>


            <!-- PRODUCT 4 -->

            <div class="product-card" data-name="coca cola">

                <div class="product-image">🥤</div>

                <span class="delivery">10 MIN</span>

                <h3>Coca Cola</h3>

                <p class="quantity">750 ml</p>

                <div class="product-bottom">

                    <strong>₹40</strong>

                    <button onclick="addToCart('Coca Cola',40)">
                        ADD
                    </button>

                </div>

            </div>


            <!-- PRODUCT 5 -->

            <div class="product-card" data-name="bread">

                <div class="product-image">🍞</div>

                <span class="delivery">10 MIN</span>

                <h3>Fresh White Bread</h3>

                <p class="quantity">400 g</p>

                <div class="product-bottom">

                    <strong>₹35</strong>

                    <button onclick="addToCart('Bread',35)">
                        ADD
                    </button>

                </div>

            </div>


            <!-- PRODUCT 6 -->

            <div class="product-card" data-name="chocolate">

                <div class="product-image">🍫</div>

                <span class="delivery">10 MIN</span>

                <h3>Cadbury Dairy Milk</h3>

                <p class="quantity">110 g</p>

                <div class="product-bottom">

                    <strong>₹95</strong>

                    <button onclick="addToCart('Chocolate',95)">
                        ADD
                    </button>

                </div>

            </div>

        </div>

    </section>


    <!-- WHY US -->

    <section class="why">

        <div class="why-card">
            <span>⚡</span>
            <h3>Fast Delivery</h3>
            <p>Get your everyday essentials quickly.</p>
        </div>

        <div class="why-card">
            <span>🥬</span>
            <h3>Fresh Products</h3>
            <p>Quality groceries for your everyday needs.</p>
        </div>

        <div class="why-card">
            <span>💰</span>
            <h3>Great Prices</h3>
            <p>Discover offers across thousands of products.</p>
        </div>

    </section>

</main>


<!-- ================= FOOTER ================= -->

<footer>

    <div class="footer-logo">
        blink<span>it</span>
    </div>

    <p>
        Your everyday groceries, delivered quickly.
    </p>

    <div class="footer-links">
        <a href="#">About</a>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
    </div>

    <p class="copyright">
        © 2026 Grocery Delivery UI
    </p>

</footer>


<!-- TOAST -->

<div id="toast"></div>


<script src="script.js"></script>

</body>
</html>