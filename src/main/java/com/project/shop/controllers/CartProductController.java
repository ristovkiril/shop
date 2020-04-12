package com.project.shop.controllers;


import com.project.shop.model.Requests.Cart.CreateCartProductRequest;
import com.project.shop.model.relations.CartProduct;
import com.project.shop.service.CartProductService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/cartProduct", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class CartProductController {
    private final CartProductService cartProductService;

    public CartProductController(CartProductService cartProductService) {
        this.cartProductService = cartProductService;
    }

    @GetMapping("/all")
    public List<CartProduct> getAllCartProducts(){
        return cartProductService.getAllCartProducts();
    }

    @GetMapping("/cart/{id}")
    public List<CartProduct> getProductsFromCart(@PathVariable(name = "id") UUID id){
        return cartProductService.findAllProductsFromCart(id);
    }

    @GetMapping
    public List<CartProduct> getProductsFromCartPaged(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue =
            "10") int size){
        return cartProductService.getAllCartProductsPaged(page,size);
    }

    @GetMapping("/{id}")
    public CartProduct getProducts(@PathVariable(name = "id") UUID id){
        return cartProductService.getCartProduct(id);
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/create")
    public CartProduct createNewCartProduct(@RequestBody CreateCartProductRequest cartProductRequest,
                                            HttpServletResponse response,
                                            UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(cartProductRequest.getCartId()).toUriString());

        return cartProductService.create(cartProductRequest);
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/edit")
    public CartProduct editCart(@RequestBody CartProduct cartProduct, HttpServletResponse response, UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(cartProduct.getId()).toUriString());

        return cartProductService.update(cartProduct);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(name = "id")UUID id){
        cartProductService.delete(id);
    }
}
