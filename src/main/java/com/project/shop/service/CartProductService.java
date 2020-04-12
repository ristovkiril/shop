package com.project.shop.service;

import com.project.shop.model.Cart;
import com.project.shop.model.Requests.Cart.CreateCartProductRequest;
import com.project.shop.model.relations.CartProduct;
import com.project.shop.model.relations.ProductSize;

import java.util.List;
import java.util.UUID;

public interface CartProductService {

    List<CartProduct> getAllCartProducts();

    List<CartProduct> getAllCartProductsPaged(int page, int size);

    CartProduct getCartProduct(UUID id);

    CartProduct create(CreateCartProductRequest cartProductRequest);

    CartProduct update(CartProduct cartProduct);

    void delete(UUID id);

    CartProduct getByCartAndProduct(Cart cart, ProductSize productSize);

    List<CartProduct> findAllProductsFromCart(UUID id);

}
