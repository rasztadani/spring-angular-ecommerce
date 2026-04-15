package com.luv2code.ecommerce.model;

import java.math.BigDecimal;

public record ProductRequest(
        String sku,
        String name,
        String description,
        BigDecimal unitPrice,
        String imageUrl,
        Boolean active,
        Integer unitsInStock,
        Long categoryId
) {
}
