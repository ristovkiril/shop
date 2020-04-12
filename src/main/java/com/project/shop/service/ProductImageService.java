package com.project.shop.service;

import com.project.shop.model.ProductImage;

import java.util.List;
import java.util.UUID;

public interface ProductImageService {

    ProductImage findProductImageById(UUID id);

    List<ProductImage> findByProductID(UUID id);
}
