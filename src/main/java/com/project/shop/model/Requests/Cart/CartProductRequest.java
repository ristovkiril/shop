package com.project.shop.model.Requests.Cart;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CartProductRequest {

    private UUID id;
    private UUID productSizeId;
    private int quantity;

}
