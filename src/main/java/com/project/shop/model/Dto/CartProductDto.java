package com.project.shop.model.Dto;

import com.project.shop.model.Cart;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CartProductDto {

    private UUID id;

    private Cart cart;

    private ProductSizeDto productSize;

    private int quantity;
}
