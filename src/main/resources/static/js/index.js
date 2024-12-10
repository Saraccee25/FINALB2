let products = [
        { id: 1, name: "Camiseta Básica", category: "Camisetas", price: 19.99, stock: 100 },
        { id: 2, name: "Jeans Clásicos", category: "Pantalones", price: 49.99, stock: 50 },
        { id: 3, name: "Vestido de Noche", category: "Vestidos", price: 79.99, stock: 30 },
        { id: 4, name: "Collar de Perlas", category: "Accesorios", price: 29.99, stock: 20 }
    ];

    function renderTable() {
        const tableBody = document.querySelector("#inventoryTable tbody");
        tableBody.innerHTML = "";
        products.forEach(product => {
            const row = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                    <td class="actions">
                        <button onclick="editProduct(${product.id})">Editar</button>
                        <button onclick="deleteProduct(${product.id})">Eliminar</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    function applyFilters() {
        const nameFilter = document.getElementById("nameFilter").value.toLowerCase();
        const categoryFilter = document.getElementById("categoryFilter").value;

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(nameFilter) &&
            (categoryFilter === "" || product.category === categoryFilter)
        );

        const tableBody = document.querySelector("#inventoryTable tbody");
        tableBody.innerHTML = "";
        filteredProducts.forEach(product => {
            const row = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                    <td class="actions">
                        <button onclick="editProduct(${product.id})">Editar</button>
                        <button onclick="deleteProduct(${product.id})">Eliminar</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    function openModal(id = null) {
        const modal = document.getElementById("productModal");
        const form = document.getElementById("productForm");
        form.reset();
        if (id) {
            const product = products.find(p => p.id === id);
            document.getElementById("productId").value = product.id;
            document.getElementById("productName").value = product.name;
            document.getElementById("productCategory").value = product.category;
            document.getElementById("productPrice").value = product.price;
            document.getElementById("productStock").value = product.stock;
        }
        modal.style.display = "block";
    }

    function closeModal() {
        const modal = document.getElementById("productModal");
        modal.style.display = "none";
    }

    function editProduct(id) {
        openModal(id);
    }

    function deleteProduct(id) {
        if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            products = products.filter(product => product.id !== id);
            renderTable();
        }
    }

    document.getElementById("productForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const id = document.getElementById("productId").value;
        const name = document.getElementById("productName").value;
        const category = document.getElementById("productCategory").value;
        const price = parseFloat(document.getElementById("productPrice").value);
        const stock = parseInt(document.getElementById("productStock").value);

        if (id) {
            // Editar producto existente
            const index = products.findIndex(p => p.id === parseInt(id));
            products[index] = { id: parseInt(id), name, category, price, stock };
        } else {
            // Agregar nuevo producto
            const newId = Math.max(...products.map(p => p.id)) + 1;
            products.push({ id: newId, name, category, price, stock });
        }

        renderTable();
        closeModal();
    });

    // Inicializar la tabla
    renderTable();