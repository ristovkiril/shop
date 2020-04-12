package com.project.shop.service.impl;

import com.project.shop.model.Category;
import com.project.shop.model.Dto.ProductDto;
import com.project.shop.model.Product;
import com.project.shop.model.ProductImage;
import com.project.shop.model.Requests.Product.CreateProductRequest;
import com.project.shop.model.Size;
import com.project.shop.model.relations.ProductSize;
import com.project.shop.repository.CategoryRepository;
import com.project.shop.repository.ProductRepository;
import com.project.shop.repository.SizeRepository;
import com.project.shop.repository.relations.ProductImageRepository;
import com.project.shop.repository.relations.ProductSizeRepository;
import com.project.shop.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository repository;
    private final CategoryRepository categoryRepository;
    private final SizeRepository sizeRepository;
    private final ProductSizeRepository productSizeRepository;
    private final ProductImageRepository productImageRepository;

    public ProductServiceImpl(ProductRepository repository, CategoryRepository categoryRepository, SizeRepository sizeRepository, ProductSizeRepository productSizeRepository, ProductImageRepository productImageRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
        this.sizeRepository = sizeRepository;
        this.productSizeRepository = productSizeRepository;
        this.productImageRepository = productImageRepository;
    }


    @Override
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @Override
    public Page<Product> getAllProductsPaged(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Product getProduct(UUID id) {
        return repository.findById(id).orElseThrow(RuntimeException::new);
    }

    @Override
    @Transactional
    public Product createProduct(CreateProductRequest productRequest) {
        //change this to specify exception
        Category category = categoryRepository.findById(productRequest.getCategoryId()).orElseThrow(() -> new RuntimeException());

        Product product = new Product();
        product = repository.save(product);

        var mainCategory = categoryRepository.findById(category.getSubcategory().getId()).orElse(null);
        if(mainCategory!=null){
            mainCategory.getProducts().add(product);
            categoryRepository.save(mainCategory);
        }

        return getProduct(productRequest, category, product);
    }

    @Override
    public Product update(UUID id, CreateProductRequest productRequest) {
        //change this to specify exception
        Category category = categoryRepository.findById(productRequest.getCategoryId()).orElseThrow(() -> new RuntimeException());

        var product = repository.findById(id).orElseThrow(() -> new RuntimeException());

        product.setName(productRequest.getName());
        product.setCategory(category);
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());

        repository.save(product);

        var products = productRequest.getSizes().stream().map(x -> {
            ProductSize productSize = productSizeRepository.findById(x.getSize()).orElseThrow(RuntimeException::new);

            productSize.setQuantity(x.getQuantity());

            return productSize;
        }).collect(Collectors.toList());

        productSizeRepository.saveAll(products);
        //product.getSizes().addAll(products);

        return product;
    }

    private Product getProduct(CreateProductRequest productRequest, Category category, Product product) {
        product.setCategory(category);
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());

        repository.save(product);

        var products = productRequest.getSizes().stream().map(x -> {
            Size size = sizeRepository.findById(x.getSize()).orElseThrow(() -> new RuntimeException());
            ProductSize productSize = new ProductSize();

            productSize.setProductId(product);
            productSize.setSizeId(size);
            productSize.setQuantity(x.getQuantity());

            return productSize;
        }).collect(Collectors.toList());

        productSizeRepository.saveAll(products);
        product.getSizes().addAll(products);

        return product;
    }

    @Override
    public void delete(UUID id) {
        var productSizes = productSizeRepository.findAllByProductId_Id(id);

        productSizeRepository.deleteAll(productSizes);

        repository.deleteById(id);
    }

    @Override
    public List<Product> getProductsByCategory(UUID categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        return repository.findAllByCategory(category);
    }

    @Override
    public Page<Product> getProductsByCategoryPaged(UUID categoryId, int page, int size) {
        Category category = categoryRepository.findById(categoryId).orElse(null);

        Pageable pageable = PageRequest.of(page, size);

        return repository.findAllByCategorySubcategory(category, pageable);
    }

    @Override
    public Page<Product> getMostViewedProducts() {
        Pageable pageable = PageRequest.of(0,6,  Sort.by("views").descending());

        return repository.findAll(pageable);
    }

    @Override
    public Product increaseViews(UUID id) {
        var product = repository.findById(id).orElseThrow(RuntimeException::new);
        synchronized (product.getViews()) {
            product.increaseViews();
        }
        return repository.save(product);
    }

    @Override
    public Page<Product> getAllProductSearchEngine(String term, int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        return repository.findAllByNameContains(term, pageable);
    }

    @Override
    public ProductImage getFirstImage(UUID id) {
        return productImageRepository.findAllByProductId_Id(id).get(0);
    }

    @Override
    public List<ProductImage> createProductImage(UUID id, List<MultipartFile> images) {
        var product = repository.findById(id).orElseThrow(RuntimeException::new);

        var productImages = images.stream()
                .map(s ->
                        {
                            try {
                                var image = new ProductImage();

                                System.out.println(s.getBytes());
                                image.setImage(s.getBytes());
                                image.setProductId(product);

                                return image;
                            } catch (IOException e) {
                                return null;
                            }
                        }
                )
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        if (product.getImages().size() == 0) {
            productImages.get(0).setMainImage(true);
        }

        return  productImageRepository.saveAll(productImages);
    }

    @Override
    public List<ProductImage> getAllProductImages(UUID id) {

        return productImageRepository.findAllByProductId_Id(id);
    }

    @Override
    public void deleteImage(UUID id) {
        try {
            productImageRepository.deleteById(id);
        } catch(Exception e){
            System.out.println(e);
        }
    }

    @Override
    public void refreshViews() {
        var products = repository.findAll();

        products.forEach(p -> {
            p.setViews(0L);
        });

        repository.saveAll(products);
    }

    @Override
    public List<ProductImage> setMainImage(UUID productId, UUID imageId) {
        var images = productImageRepository.findAllByProductId_Id(productId);

        if(images != null) {
            images.forEach(i -> {
                if (i.getId().equals(imageId)){
                    i.setMainImage(true);
                }
                else{
                    i.setMainImage(false);
                }
            });
            images = productImageRepository.saveAll(images);
        }

        return images;
    }

}
