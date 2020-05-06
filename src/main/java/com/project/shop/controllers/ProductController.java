package com.project.shop.controllers;

import com.project.shop.mappers.ProductMapper;
import com.project.shop.model.Dto.ProductDto;
import com.project.shop.model.Product;
import com.project.shop.model.ProductImage;
import com.project.shop.model.Requests.Product.CreateProductRequest;
import com.project.shop.model.relations.ProductSize;
import com.project.shop.service.ProductService;
import com.project.shop.service.ProductSizeService;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/products", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class ProductController {

    private final ProductService productService;
    private final ProductSizeService productSizeService;

    private final ProductMapper productMapper;

    public ProductController(ProductService productService, ProductSizeService productSizeService, ProductMapper productMapper) {
        this.productService = productService;
        this.productSizeService = productSizeService;
        this.productMapper = productMapper;
    }

    @GetMapping
    public Page<ProductDto> getAllProductsPaged(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "10") int size){
        return productMapper.getAllProductsPaged(page, size);
    }

    @GetMapping("/all")
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable(name = "id") UUID id){
        return productMapper.getProductDto(id);
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/create")
    public Product createNewProduct(@RequestBody CreateProductRequest product, HttpServletResponse response, UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(product.getName()).toUriString());

        return productService.createProduct(product);
    }

    @GetMapping("/search")
    public Page<ProductDto> getAllProductsSearchEnginePaged(@RequestParam String term,
                                                         @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size){
        return productMapper.getAllProductSearchEngine(term ,page, size);
    }

    @PatchMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/edit/{id}")
    public Product editProduct(@PathVariable(name = "id")UUID id ,@RequestBody CreateProductRequest createProductRequest, HttpServletResponse response, UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(createProductRequest.getName()).toUriString());

        return productService.update(id, createProductRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(name = "id") UUID id){
        productService.delete(id);
    }

    @GetMapping("/category/{id}")
    public Page<ProductDto> getProductByCategoryPaged(@PathVariable(name = "id")UUID id,
                                                   @RequestParam(defaultValue = "1") int page,
                                                   @RequestParam(defaultValue = "10") int size){
        return productMapper.getProductsByCategoryPaged(id, page, size);
    }

    @GetMapping("/category/all/{id}")
    public List<Product> getProductByCategory(@PathVariable(name = "id")UUID id){
        return productService.getProductsByCategory(id);
    }

    @GetMapping("/product/{id}")
    public List<ProductSize> getAllSizesFromProduct(@PathVariable(name = "id") UUID id){
        return productSizeService.getAllByProduct(id);
    }

    @GetMapping("/size/{id}")
    public List<ProductSize> getAllProductBySize(@PathVariable(name = "id") UUID id){
        return productSizeService.getAllBySize(id);
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/increase/{id}")
    public Product increaseViews(@PathVariable(name = "id") UUID id,
                                    HttpServletResponse response,
                                    UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(id).toUriString());

        return productService.increaseViews(id);
    }

    @GetMapping("/mostViewed")
    public Page<ProductDto> mostViewed(@RequestParam(name = "size", defaultValue = "6")int size ){
        return productMapper.getMostViewedProducts(size);
    }

    @GetMapping("/product/{id}/images")
    public List<ProductImage> getAllImagesFromProduct(@PathVariable(name = "id")UUID id){
        return productService.getAllProductImages(id);
    }

    @GetMapping("/product/{id}/image")
    public ProductImage getFirstImage(@PathVariable(name = "id")UUID id){
        return productService.getFirstImage(id);
    }

    @PatchMapping(path = "/product/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<ProductImage> editImages(@PathVariable(name = "id") UUID id,
                                         @ModelAttribute MultipartFile[] images) {

        return productService.createProductImage(id, Arrays.asList(images));
    }

    @PatchMapping(path = "/product/{productId}/images/main")
    public List<ProductImage> mainImage(@PathVariable(name = "productId") UUID productId,
                                        @RequestParam(defaultValue = "", name = "image")UUID imageId) {

        return productService.setMainImage(productId,imageId);
    }

    @DeleteMapping("/product/image/{id}")
    public void deleteImage(@PathVariable(name = "id")UUID id){
        productService.deleteImage(id);
    }

}
