
<script>
    // Simulated MongoDB collection
    let products = [];

    // Bulk Population
    function insertProducts() {
        products = [
            { name: "Laptop", category: "Electronics", price: 70000, stock: 10 },
            { name: "Headphones", category: "Electronics", price: 3000, stock: 50 },
            { name: "T-Shirt", category: "Clothing", price: 800, stock: 100 },
            { name: "Jeans", category: "Clothing", price: 2000, stock: 60 },
            { name: "Sofa", category: "Furniture", price: 25000, stock: 5 },
            { name: "Table", category: "Furniture", price: 12000, stock: 15 }
        ];

        document.getElementById("output").textContent =
            "Bulk Inserted Products:\n\n" +
            JSON.stringify(products, null, 2);
    }

    // Query 1: Find Electronics
    function findElectronics() {
        const electronics = products.filter(
            product => product.category === "Electronics"
        );

        document.getElementById("output").textContent =
            "Electronics Products:\n\n" +
            JSON.stringify(electronics, null, 2);
    }

    // Query 2: Sort by price desc & limit 2
    function sortByPrice() {
        const sortedProducts = [...products]
            .sort((a, b) => b.price - a.price)
            .slice(0, 2);

        document.getElementById("output").textContent =
            "Top 2 Expensive Products:\n\n" +
            JSON.stringify(sortedProducts, null, 2);
    }
</script>