package com.example.finalBD2.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "products")
public class Product {

    @Id
    private String id;
    private String name;
    private String category;
    private double price;
    private double stock;
    private String size;

}

