<script>
async function fetchProducts() {
    try {
        const response = await fetch("/products");
        const products = await response.json();

        const table = document.getElementById("productTable");
        table.innerHTML = "";

        products.forEach(p => {
            let row = table.insertRow();
            row.insertCell(0).innerText = p.name;
            row.insertCell(1).innerText = p.category;
            row.insertCell(2).innerText = p.price;
            row.insertCell(3).innerText = p.stock;
        });
    } catch (error) {
        alert("Error fetching products");
    }
}
</script>