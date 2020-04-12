package com.project.shop.controllers;


import com.project.shop.mappers.ProductMapper;
import com.project.shop.model.Cart;
import com.project.shop.model.Dto.CartProductDto;
import com.project.shop.model.Requests.Cart.CartEditRequest;
import com.project.shop.model.Requests.Cart.CreateCartProductRequest;
import com.project.shop.model.Requests.User.OrderRequest;
import com.project.shop.model.relations.CartProduct;
import com.project.shop.service.CartProductService;
import com.project.shop.service.CartService;
import org.springframework.data.domain.Page;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/cart", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class CartController {
    private final CartService cartService;
    private final CartProductService cartProductService;

    private final ProductMapper productMapper;

    public CartController(CartService cartService, CartProductService cartProductService, ProductMapper productMapper) {
        this.cartService = cartService;
        this.cartProductService = cartProductService;
        this.productMapper = productMapper;
    }

    @GetMapping
    public List<Cart> getAllCarts(){
        return cartService.getAllCarts();
    }

    @GetMapping("/{id}")
    public Cart getCart(@PathVariable(name = "id") UUID id){
        return  cartService.getCart(id);
    }


    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/create")
    public Cart createNewCart(@RequestBody Cart cart, HttpServletResponse response, UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(cart.getId()).toUriString());

        return cartService.create(cart);
    }

    @PatchMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/edit")
    public Cart editCart(@RequestBody CartEditRequest cartEditRequest, HttpServletResponse response,
                         UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(cartEditRequest.getId()).toUriString());

        return cartService.update(cartEditRequest);
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable(name = "id")UUID id){
        cartService.delete(id);
    }

    @GetMapping("/orders/{id}")
    public List<Cart> getAllOrdersFromUser(@PathVariable(name = "id") UUID id){
        return cartService.getAllCartsFromUserStatusTrue(id);
    }

    @GetMapping("/orders")
    public Page<Cart> getAllOrders(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue =
            "10") int size){
        return cartService.getAllCartsStatusTrue(page,size);
    }

    @GetMapping("/user/{id}")
    public Cart getUserCart(@PathVariable(name = "id") UUID id){
        return cartService.getCartFromUserStatusFalse(id);
    }

    @GetMapping("/products/{id}")
    public List<CartProductDto> getProducts(@PathVariable(name = "id") UUID id){
        return productMapper.getCartProducts(id);
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/add")
    public CartProduct addProduct(@RequestBody CreateCartProductRequest cartProductRequest){
        return cartProductService.create(cartProductRequest);
    }
    //Id na CartProduct
    @DeleteMapping("/product/{id}")
    public void deleteProduct(@PathVariable(name = "id") UUID id, HttpServletResponse response,
                              UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(id).toUriString());

        cartProductService.delete(id);
    }
    //Id na cart
    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/order/{id}")
    public Cart createOrder(@PathVariable(name = "id") UUID id, @RequestBody List<CartProduct> cartProducts, HttpServletResponse response,
                              UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(id).toUriString());

        return cartService.createOrder(id, cartProducts);
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/order")
    public Cart createOrderRequest(@RequestBody OrderRequest orderRequest,
                             HttpServletResponse response,
                            UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(orderRequest).toUriString());

        return cartService.createOrderRequest(orderRequest);
    }
}
