package com.project.shop.model.Requests.User;

import com.project.shop.model.Requests.Cart.CartProductRequest;
import com.project.shop.model.Requests.Cart.CartRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderRequest {


    private CartRequest cart;

    private List<CartProductRequest> cartProducts = new ArrayList<>();

}
