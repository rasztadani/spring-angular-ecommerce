package com.luv2code.ecommerce.mapping;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.model.ProductCategoryDto;
import com.luv2code.ecommerce.model.ProductDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapping {

    ProductDto toProductDto(Product product);

    Product toProduct(ProductDto productDto);

    ProductCategoryDto toProductCategoryDto(ProductCategory productCategory);

    ProductCategory toProductCategory(ProductCategoryDto productCategoryDto);
}
