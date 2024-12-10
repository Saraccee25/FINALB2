package com.example.finalBD2.entity;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "products")
public class Product {

    @Id
    private String id;

    @NotBlank(message = "El nombre del producto no puede estar vacío.")
    @Size(min = 2, max = 100, message = "El nombre del producto debe tener entre 2 y 100 caracteres.")
    private String name;

    @NotBlank(message = "La categoría no puede estar vacía.")
    private String category;

    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0.")
    private double price;

    @Min(value = 0, message = "El stock no puede ser negativo.")
    private double stock;

    @NotBlank(message = "El tamaño del producto no puede estar vacío.")
    private String size;

}
