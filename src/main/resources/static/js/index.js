let products = [];

async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:8080/api/products");
        if (response.ok) {
            products = await response.json();

            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                if (product.stock === 0) {
                    await deleteProduct(product.id); 
                    i--; 
                }
            }

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
                    <button onclick="openEditModal('${product.id}')">Editar</button>
                    <button onclick="deleteProduct('${product.id}')">Eliminar</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

async function applyFilters() {
    const nameFilter = document.getElementById("nameFilter").value.toLowerCase();
    const categoryFilter = document.getElementById("categoryFilter").value;

    try {
        let response;

        if (nameFilter) {
            response = await fetch(`http://localhost:8080/api/products/search/by-name?name=${nameFilter}`);
        } else {
            response = await fetch("http://localhost:8080/api/products");
        }

        if (response.ok) {
            let productsData = await response.json();
            if (categoryFilter) {
                productsData = productsData.filter(product => product.category === categoryFilter);
            }

            products = productsData;
            renderTable();
        } else {
            console.error("Error al cargar los productos filtrados:", response.statusText);
            alert("Hubo un error al cargar los productos filtrados.");
        }
    } catch (error) {
        console.error("Error al comunicarse con el backend:", error);
        alert("No se pudo conectar al servidor.");
    }
}

function openAddModal() {
    const modal = document.getElementById("addProductModal");
    const form = document.getElementById("addProductForm");
    form.reset();
    modal.style.display = "block";
}

function openEditModal(id) {
    const modal = document.getElementById("editProductModal");
    const form = document.getElementById("editProductForm");
    form.reset();
    
    const product = products.find(p => p.id === id);
    document.getElementById("editProductId").value = product.id;
    document.getElementById("editProductName").value = product.name;
    document.getElementById("editProductCategory").value = product.category;
    document.getElementById("editProductPrice").value = product.price;
    document.getElementById("editProductStock").value = product.stock;
    document.getElementById("editProductSize").value = product.size;

    modal.style.display = "block";
}

function closeModal() {
    const addModal = document.getElementById("addProductModal");
    const editModal = document.getElementById("editProductModal");
    addModal.style.display = "none";
    editModal.style.display = "none";
}

async function deleteProduct(id) {
    const product = products.find(p => p.id === id);

    if (product.stock === 0 || confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        try {
            const response = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                products = products.filter(product => product.id !== id);
                renderTable();
                if (product.stock > 0) {
                    alert("Producto eliminado correctamente.");
                }
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


document.getElementById("addProductForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validateAddProductForm()) {
        return; 
    }

    const name = document.getElementById("addProductName").value;
    const category = document.getElementById("addProductCategory").value;
    const price = parseFloat(document.getElementById("addProductPrice").value);
    const stock = parseInt(document.getElementById("addProductStock").value);
    const size = document.getElementById("addProductSize").value;

    const product = { name, category, price, stock, size };

    if (stock <= 20) {
        alert("¡Advertencia! El stock de este producto es menor o igual a 20.");
    }

    try {
        const response = await fetch("http://localhost:8080/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            const newProduct = await response.json();
            products.push(newProduct);
            renderTable();
            closeModal();
            alert("Producto agregado exitosamente.");
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

document.getElementById("editProductForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validateEditProductForm()) {
        return; 
    }

    const id = document.getElementById("editProductId").value;
    const name = document.getElementById("editProductName").value;
    const category = document.getElementById("editProductCategory").value;
    const price = parseFloat(document.getElementById("editProductPrice").value);
    const stock = parseInt(document.getElementById("editProductStock").value);
    const size = document.getElementById("editProductSize").value;

    const product = { id, name, category, price, stock, size };

    if (stock <= 20) {
        alert("¡Advertencia! El stock de este producto es menor o igual a 20.");
    }

    try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            const updatedProduct = await response.json();
            const index = products.findIndex(p => p.id === id);
            products[index] = updatedProduct;
            renderTable();
            closeModal();
            alert("Producto editado exitosamente.");
        } else {
            const error = await response.json();
            console.error("Error al editar el producto:", error);
            alert("Hubo un error al editar el producto.");
        }
    } catch (error) {
        console.error("Error al comunicarse con el backend:", error);
        alert("No se pudo conectar al servidor.");
    }
});

fetchProducts();

// Validación para el formulario de agregar producto
function validateAddProductForm() {
    const name = document.getElementById("addProductName").value.trim();
    const category = document.getElementById("addProductCategory").value;
    const price = parseFloat(document.getElementById("addProductPrice").value);
    const stock = parseInt(document.getElementById("addProductStock").value);
    const size = document.getElementById("addProductSize").value.trim();

    if (!name || name.length < 2) {
        alert("El nombre del producto es obligatorio y debe tener al menos 2 caracteres.");
        return false;
    }

    if (!category) {
        alert("Por favor, seleccione una categoría.");
        return false;
    }

    if (isNaN(price) || price <= 0) {
        alert("El precio debe ser un número mayor que cero.");
        return false;
    }

    if (isNaN(stock) || stock < 0) {
        alert("El stock debe ser un número mayor o igual a cero.");
        return false;
    }

    if (!size) {
        alert("La talla es obligatoria.");
        return false;
    }

    return true;
}

// Validación para el formulario de editar producto
function validateEditProductForm() {
    const name = document.getElementById("editProductName").value.trim();
    const category = document.getElementById("editProductCategory").value;
    const price = parseFloat(document.getElementById("editProductPrice").value);
    const stock = parseInt(document.getElementById("editProductStock").value);
    const size = document.getElementById("editProductSize").value.trim();

    if (!name || name.length < 2) {
        alert("El nombre del producto es obligatorio y debe tener al menos 2 caracteres.");
        return false;
    }

    if (!category) {
        alert("Por favor, seleccione una categoría.");
        return false;
    }

    if (isNaN(price) || price <= 0) {
        alert("El precio debe ser un número mayor que cero.");
        return false;
    }

    if (isNaN(stock) || stock < 0) {
        alert("El stock debe ser un número mayor o igual a cero.");
        return false;
    }

    if (!size) {
        alert("La talla es obligatoria.");
        return false;
    }

    return true;
}

function clearFilters() {
    document.getElementById("nameFilter").value = '';
    document.getElementById("categoryFilter").value = '';
    applyFilters();
}


