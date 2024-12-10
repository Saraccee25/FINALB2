package com.example.finalBD2.service;


import com.example.finalBD2.entity.Product;
import com.example.finalBD2.exception.ProductNotFoundException;
import com.example.finalBD2.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("El producto con el ID " + id + " no existe.");
        }
        productRepository.deleteById(id);
    }

    public List<Product> getLowStockProducts(int threshold) {
        return productRepository.findAll().stream()
                .filter(product -> product.getStock() < threshold)
                .toList();
    }

    public List<Product> getProductsByName(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        if (products.isEmpty()) {
            throw new ProductNotFoundException("No se encontraron productos con el nombre: " + name);
        }
        return products;
    }

    public List<Product> getProductsByCategory(String category) {
        List<Product> products = productRepository.findByCategoryContainingIgnoreCase(category);
        if (products.isEmpty()) {
            throw new ProductNotFoundException("No se encontraron productos en la categoría: " + category);
        }
        return products;
    }

    public Product updateProduct(String id, Product updatedProduct) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();
            product.setName(updatedProduct.getName());
            product.setCategory(updatedProduct.getCategory());
            product.setPrice(updatedProduct.getPrice());
            product.setStock(updatedProduct.getStock());
            return productRepository.save(product);
        } else {
            throw new ProductNotFoundException("El producto con el ID " + id + " no existe.");
        }
    }
}

