package com.project.shop.mappers.impl;

import com.project.shop.mappers.ProductMapper;
import com.project.shop.model.Dto.CartProductDto;
import com.project.shop.model.Dto.ImageDto;
import com.project.shop.model.Dto.ProductDto;
import com.project.shop.model.Dto.ProductSizeDto;
import com.project.shop.model.Product;
import com.project.shop.model.relations.ProductSize;
import com.project.shop.repository.CartRepository;
import com.project.shop.repository.CategoryRepository;
import com.project.shop.repository.ProductRepository;
import com.project.shop.repository.relations.CartProductRepository;
import com.project.shop.repository.relations.ProductSizeRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class ProductMapperImpl implements ProductMapper {

    private static final String productImagesEndpoint = "api/images/locals";

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductSizeRepository productSizeRepository;
    private final CartRepository cartRepository;
    private final CartProductRepository cartProductRepository;

    public ProductMapperImpl(ProductRepository productRepository, CategoryRepository categoryRepository, ProductSizeRepository productSizeRepository, CartRepository cartRepository, CartProductRepository cartProductRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productSizeRepository = productSizeRepository;
        this.cartRepository = cartRepository;
        this.cartProductRepository = cartProductRepository;
    }

    public Page<ProductDto> mapToProductDtoPage(Page<Product> productPage) {
        if (productPage == null) {
            return Page.empty();
        }

        return new PageImpl<>(
                productPage.get()
                        .map(p -> mapProductToProductDto(p))
                        .collect(Collectors.toList()),
                PageRequest.of(productPage.getNumber(), productPage.getSize(), productPage.getSort()),
                productPage.getTotalElements());
    }

    private ProductSizeDto mapProductToProductSizeDto(ProductSize product) {
        var productDto = new ProductSizeDto();
        productDto.setId(product.getId());
        productDto.setSizeId(product.getSizeId());
        productDto.setQuantity(product.getQuantity());
        productDto.setProductId(mapProductToProductDto(product.getProductId()));

        return productDto;
    }

    private ProductDto mapProductToProductDto(Product product) {
        var productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setCategory(product.getCategory());
        productDto.setDescription(product.getDescription());
        productDto.setName(product.getName());
        productDto.setPrice(product.getPrice());
        productDto.setViews(product.getViews());
        productDto.setLastWeekViews(product.getLastWeekViews());
        productDto.setSizes(productSizeRepository.findAllByProductId_Id(product.getId()));
        productDto.setImages(product.getImages().stream()
                .map(i -> {
                    var imageDto = new ImageDto();
                    imageDto.setImage(GenerateLink(i.getId()));
                    imageDto.setMainImage(i.isMainImage());
                    imageDto.setId(i.getId());
                    if(i.isMainImage()){
                        productDto.setMainImage(imageDto.getImage());
                    }

                    return imageDto;
                })
                .collect(Collectors.toList()));

        return productDto;
    }


    private String GenerateLink(UUID id) {
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path(productImagesEndpoint)
                .pathSegment(String.valueOf(id))
                .buildAndExpand()
                .toUriString();
    }

    @Override
    public Page<ProductDto> getAllProductsPaged(int page, int size) {
        return mapToProductDtoPage(productRepository.findAll(PageRequest.of(page,size)));
    }

    @Override
    public Page<ProductDto> getProductsByCategoryPaged(UUID categoryId, int page, int size) {
        var category = categoryRepository.findById(categoryId).orElseThrow(RuntimeException::new);

        return mapToProductDtoPage(productRepository.findAllByCategorySubcategory(category, PageRequest.of(page,size)));
    }

    @Override
    public Page<ProductDto> getAllProductSearchEngine(String term, int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        return mapToProductDtoPage(productRepository.findAllByNameContains(term, pageable));
    }

    @Override
    public ProductDto getProductDto(UUID id) {
        return mapProductToProductDto(productRepository.findById(id).orElseThrow(RuntimeException::new));
    }

    @Override
    public Page<ProductDto> getMostViewedProducts(int size) {
        Pageable pageable = PageRequest.of(0,size,  Sort.by("views").descending());

        return mapToProductDtoPage(productRepository.findAll(pageable));
    }

    @Override
    public List<CartProductDto> getCartProducts(UUID id) {
        var cart = cartRepository.findById(id).orElseThrow(RuntimeException::new);
        var products = cartProductRepository.findAllByCart_Id(id);

        if(products == null){
            throw new RuntimeException("Products not found");
        }

        var productsDto = products.stream().map(p -> {
           var cartProduct = new CartProductDto();
            cartProduct.setId(p.getId());
            cartProduct.setCart(p.getCart());
            cartProduct.setProductSize(mapProductToProductSizeDto(p.getProductSize()));
            //ako imame poracano povekje produkti od so ima da bide max na produkti
            cartProduct.setQuantity(p.getQuantity() > p.getProductSize().getQuantity() && !cart.isStatus()?
                    p.getProductSize().getQuantity() : p.getQuantity());


            return cartProduct;
        }).collect(Collectors.toList());

        return productsDto;
    }


}
