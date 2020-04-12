package com.project.shop.model.Requests.User;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class EditUserRequest {

    private String name;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;

}
