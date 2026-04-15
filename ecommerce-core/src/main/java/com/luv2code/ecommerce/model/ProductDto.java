package com.luv2code.ecommerce.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class ProductDto {
    private Long id;
    private String sku;
    private String name;
    private String description;
    private BigDecimal unitPrice;
    private String imageUrl;
    private Boolean active;
    private Integer unitsInStock;
    private Date dateCreated;
    private Date lastUpdated;
    private Long categoryId;
}