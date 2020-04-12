package com.project.shop.model.Requests.Cart;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CartRequest {

    private UUID id;

    private String deliveryAddress;

    private double totalPrice;

}
