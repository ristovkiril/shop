package com.project.shop.mappers;

import com.project.shop.model.Dto.CartProductDto;
import com.project.shop.model.Dto.ProductDto;
import com.project.shop.model.Product;
import com.project.shop.model.relations.CartProduct;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ProductMapper {

    Page<ProductDto> getAllProductsPaged(int page, int size);

    Page<ProductDto> getProductsByCategoryPaged(UUID categoryId, int page, int size);

    Page<ProductDto> getAllProductSearchEngine(String term, int page, int size);

    ProductDto getProductDto(UUID id);

    Page<ProductDto> getMostViewedProducts();

    List<CartProductDto> getCartProducts(UUID id);

}
