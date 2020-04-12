package com.project.shop.model.Requests.User;

import com.project.shop.model.Enum.Roles;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String lastName;

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String phoneNumber;

    private String address;

    private Roles role = Roles.CUSTOMER;

}
