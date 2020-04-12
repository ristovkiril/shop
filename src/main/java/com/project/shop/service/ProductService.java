package com.project.shop.service;

import com.project.shop.model.Product;
import com.project.shop.model.ProductImage;
import com.project.shop.model.Requests.Product.CreateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    List<Product> getAllProducts();

    Page<Product> getAllProductsPaged(int page, int size);

    Product getProduct(UUID id);

    Product createProduct(CreateProductRequest productRequest);

    Product update(UUID id, CreateProductRequest productRequest);

    void delete (UUID id);

    List<Product> getProductsByCategory(UUID categoryId);

    Page<Product> getProductsByCategoryPaged(UUID categoryId, int page, int size);

    Page<Product> getMostViewedProducts();

    Product increaseViews(UUID id);

    Page<Product> getAllProductSearchEngine(String term, int page, int size);

    ProductImage getFirstImage(UUID id);

    List<ProductImage> createProductImage(UUID id, List<MultipartFile> images);

    List<ProductImage> getAllProductImages(UUID id);

    void deleteImage(UUID id);

    void refreshViews();

    List<ProductImage> setMainImage(UUID productId, UUID imageId);
}
