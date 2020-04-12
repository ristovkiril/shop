package com.project.shop.model.Dto;

import com.project.shop.model.Enum.Roles;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserSetRoleDto {

    UUID userId;

    String email;

    Roles role;
}
