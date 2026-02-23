<script>
    let products = [];

    // Initial data
    function loadData() {
        products = [
            { name: "Laptop", category: "Electronics", price: 700, stock: 10 },
            { name: "Mobile", category: "Electronics", price: 400, stock: 0 },
            { name: "Headphones", category: "Electronics", price: 120, stock: 25 },
            { name: "Shirt", category: "Clothing", price: 800, stock: 40 },
            { name: "Chair", category: "Furniture", price: 600, stock: 0 },
            { name: "Table", category: "Furniture", price: 1500, stock: 5 }
        ];

        display("Initial Products Loaded", products);
    }

    // Mass Update 1: $inc price by 10 for Electronics
    function increaseElectronicsPrice() {
        products.forEach(product => {
            if (product.category === "Electronics") {
                product.price += 10;   // Simulates $inc
            }
        });

        display("Updated Electronics Price (+10)", products);
    }

    // Mass Update 2: set featured:true where price > 500
    function setFeatured() {
        products.forEach(product => {
            if (product.price > 500) {
                product.featured = true;  // Simulates $set
            }
        });

        display("Featured Products (price > 500)", products);
    }

    // Cleanup: delete stock = 0
    function deleteOutOfStock() {
        products = products.filter(product => product.stock !== 0);

        display(
            "Deleted Products with Stock = 0\nRemaining Count: " + products.length,
            products
        );
    }

    // Display helper
    function display(message, data) {
        document.getElementById("output").textContent =
            message + "\n\n" + JSON.stringify(data, null, 2);
    }
</script>
