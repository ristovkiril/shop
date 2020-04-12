package com.project.shop.service.impl;

import com.project.shop.model.Product;
import com.project.shop.model.Size;
import com.project.shop.model.relations.ProductSize;
import com.project.shop.model.relations.ProductSizeId;
import com.project.shop.repository.ProductRepository;
import com.project.shop.repository.SizeRepository;
import com.project.shop.repository.relations.ProductSizeRepository;
import com.project.shop.service.ProductSizeService;
import javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductSizeServiceImpl implements ProductSizeService {

    private final ProductSizeRepository productSizeRepository;
    private final ProductRepository productRepository;
    private final SizeRepository sizeRepository;

    public ProductSizeServiceImpl(ProductSizeRepository productSizeRepository, ProductRepository productRepository, SizeRepository sizeRepository) {
        this.productSizeRepository = productSizeRepository;
        this.productRepository = productRepository;
        this.sizeRepository = sizeRepository;
    }

    @Override
    public List<ProductSize> getAllProductSize() {
        return productSizeRepository.findAll();
    }

    @Override
    public ProductSize getProductSize(UUID id) {
        return productSizeRepository.findById(id).orElse(null);
    }

    @Override
    public ProductSize create(ProductSize productSize) {
        return productSizeRepository.save(productSize);
    }

    @Override
    public ProductSize update(ProductSize productSize) {
        return productSizeRepository.save(productSize);
    }

    @Override
    public void delete(UUID id) {
        productSizeRepository.deleteById(id);
    }

    @Override
    public ProductSize getByProductAndSize(UUID productId, UUID sizeId) throws NotFoundException {
        Product product = productRepository.findById(productId).orElse(null);
        Size size = sizeRepository.findById(sizeId).orElse(null);

        if(product == null){
            throw new NotFoundException("Product not found!");
        }
        if(size == null){
            throw new NotFoundException("Size not found!");
        }

        return productSizeRepository.findByProductIdAndSizeId(product, size);
    }

    @Override
    public List<ProductSize> getAllByProduct(UUID productId) {
        return productSizeRepository.findAllByProductId_Id(productId);
    }

    @Override
    public List<ProductSize> getAllBySize(UUID sizeId) {
        return productSizeRepository.findAllBySizeId_Id(sizeId);
    }
}
