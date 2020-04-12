package com.project.shop.model.Requests.Cart;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CartEditRequest {

    private UUID id;
    private boolean status;
    private boolean delivered;
    private String deliveryAddress;
    private double totalPrice;

}
