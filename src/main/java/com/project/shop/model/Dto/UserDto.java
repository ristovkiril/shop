package com.project.shop.model.Dto;

import com.project.shop.model.Enum.Roles;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserDto {

    private UUID id;

    private String name;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String address;

    private Roles role;

}
