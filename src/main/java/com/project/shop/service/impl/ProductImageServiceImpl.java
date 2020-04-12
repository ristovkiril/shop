package com.project.shop.service.impl;

import com.project.shop.model.ProductImage;
import com.project.shop.repository.relations.ProductImageRepository;
import com.project.shop.service.ProductImageService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository imageRepository;

    public ProductImageServiceImpl(ProductImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public ProductImage findProductImageById(UUID id) {
        return imageRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @Override
    public List<ProductImage> findByProductID(UUID id) {
        return imageRepository.findAllByProductId_Id(id);
    }
}
