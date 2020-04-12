package com.project.shop.model.Requests.Cart;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CreateCartProductRequest {

    UUID cartId;

    UUID productSizeId;

    int quantity;
}
