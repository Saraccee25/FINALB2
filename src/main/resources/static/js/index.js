let products = [];

async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:8080/api/products");
        if (response.ok) {
            products = await response.json();
            renderTable();
        } else {
            console.error("Error al cargar los productos:", response.statusText);
            alert("Hubo un error al cargar los productos.");
        }
    } catch (error) {
        console.error("Error al comunicarse con el backend:", error);
        alert("No se pudo conectar al servidor.");
    }
}

function renderTable() {
    const tableBody = document.querySelector("#inventoryTable tbody");
    tableBody.innerHTML = "";
    products.forEach(product => {
        const row = `
            <tr>
                <td class="hidden">${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>${product.size}</td>
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
                <td>${product.size}</td>
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
        document.getElementById("productSize").value = product.size;
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

async function deleteProduct(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        try {
            const response = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                products = products.filter(product => product.id !== id);
                renderTable();
            } else {
                const error = await response.json();
                console.error("Error al eliminar el producto:", error);
                alert("Hubo un error al eliminar el producto.");
            }
        } catch (error) {
            console.error("Error al comunicarse con el backend:", error);
            alert("No se pudo conectar al servidor.");
        }
    }
}

document.getElementById("productForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value;
    const category = document.getElementById("productCategory").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const stock = parseInt(document.getElementById("productStock").value);
    const size = document.getElementById("productSize").value;

    const product = { name, category, price, stock, size };

    try {
        let response;
        if (id) {
            alert("Edición de productos no implementada con el backend.");
            return;
        } else {
            response = await fetch("http://localhost:8080/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
        }

        if (response.ok) {
            const newProduct = await response.json();
            products.push(newProduct);
            renderTable();
            closeModal();
        } else {
            const error = await response.json();
            console.error("Error al guardar el producto:", error);
            alert("Hubo un error al guardar el producto.");
        }
    } catch (error) {
        console.error("Error al comunicarse con el backend:", error);
        alert("No se pudo conectar al servidor.");
    }
});

fetchProducts();
