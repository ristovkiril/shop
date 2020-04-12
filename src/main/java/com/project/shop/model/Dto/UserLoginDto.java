package com.project.shop.model.Dto;

import com.project.shop.model.Cart;
import com.project.shop.model.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginDto {

    private UserDto user;

    private Cart cart;

    private int totalProducts = 0;

}
