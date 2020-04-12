package com.project.shop.service;

import com.project.shop.model.Product;
import com.project.shop.model.Size;
import com.project.shop.model.relations.ProductSize;
import com.project.shop.model.relations.ProductSizeId;
import javassist.NotFoundException;

import java.util.List;
import java.util.UUID;

public interface ProductSizeService {

    List<ProductSize> getAllProductSize();

    ProductSize getProductSize(UUID id);

    ProductSize create(ProductSize productSize);

    ProductSize update(ProductSize productSize);

    void delete(UUID id);

    ProductSize getByProductAndSize(UUID productId, UUID sizeId) throws NotFoundException;

    List<ProductSize> getAllByProduct(UUID productId);

    List<ProductSize> getAllBySize(UUID sizeId);

}
