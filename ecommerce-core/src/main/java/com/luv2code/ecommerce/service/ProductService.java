package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.mapping.ProductMapping;
import com.luv2code.ecommerce.model.ProductCategoryDto;
import com.luv2code.ecommerce.model.ProductDto;
import com.luv2code.ecommerce.repo.ProductCategoryRepository;
import com.luv2code.ecommerce.repo.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductMapping productMapping;

    public Page<ProductDto> getProductsByCategoryId(Long categoryId, int page, int size) {
        return productRepository.findByCategoryId(categoryId, PageRequest.of(page, size)).map(productMapping::toProductDto);
    }

    public Page<ProductDto> searchProducts(String keyword, int page, int size) {
        return productRepository.findByNameContainingIgnoreCase(keyword, PageRequest.of(page, size)).map(productMapping::toProductDto);
    }

    public Page<ProductDto> getAllProducts(int page, int size) {
        return productRepository.findAll(PageRequest.of(page, size))
                .map(productMapping::toProductDto);
    }

    public ProductDto getProductById(Long id) {
        return productRepository.findById(id)
                .map(productMapping::toProductDto)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public List<ProductCategoryDto> getCategories() {
        return productCategoryRepository.findAll().stream()
                .map(productMapping::toProductCategoryDto)
                .collect(Collectors.toList());
    }
}
