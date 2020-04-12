package com.project.shop.model.Requests.User;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ChangePasswordRequest {

    private UUID userId;

    private String oldPassword;

    private String newPassword;

}
