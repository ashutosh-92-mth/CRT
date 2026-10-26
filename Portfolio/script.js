let cartCount = 0;


/* ================= ADD TO CART ================= */

function addToCart(product, price) {

    cartCount++;

    document.getElementById("cartCount").textContent = cartCount;

    showToast(product + " added to cart 🛒");
}


/* ================= TOAST ================= */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);
}


/* ================= SEARCH ================= */

const searchInput =
    document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

    const searchValue =
        this.value.toLowerCase().trim();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        if (name.includes(searchValue)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});


/* ================= SCROLL TO PRODUCTS ================= */

function scrollProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= CATEGORY HOVER ================= */

document.querySelectorAll(".category").forEach(category => {

    category.addEventListener("click", () => {

        showToast(
            category.querySelector("p").textContent +
            " selected"
        );

    });

});