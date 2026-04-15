package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.model.ProductCategoryDto;
import com.luv2code.ecommerce.model.ProductDto;
import com.luv2code.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/products/{id}")
    public ProductDto getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/products/search/find-by-categoryId")
    public Page<ProductDto> getProductsByCategory(
            @RequestParam Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return productService.getProductsByCategoryId(categoryId, page, size);
    }

    @GetMapping("/products")
    public Page<ProductDto> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return productService.getAllProducts(page, size);
    }

    @GetMapping("/products/search/find-by-keyword")
    public Page<ProductDto> searchProducts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return productService.searchProducts(keyword, page, size);
    }

    @GetMapping("/product-categories")
    public List<ProductCategoryDto> getCategories() {
        return productService.getCategories();
    }
}

