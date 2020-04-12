package com.project.shop.service;

import com.project.shop.model.Cart;
import com.project.shop.model.Requests.Cart.CartEditRequest;
import com.project.shop.model.Requests.User.OrderRequest;
import com.project.shop.model.relations.CartProduct;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface CartService {

    List<Cart> getAllCarts();

    Cart getCart(UUID id);

    Cart create(Cart cart);

    Cart update(CartEditRequest cartEditRequest);

    void delete(UUID id);

    Page<Cart> getAllCartsStatusTrue(int page, int size);

    List<Cart> getAllCartsFromUserStatusTrue(UUID id);

    Cart getCartFromUserStatusFalse(UUID id);

    Cart createOrder(UUID id, List<CartProduct> cartProducts);

    Cart createOrderRequest(OrderRequest orderRequest);

}
