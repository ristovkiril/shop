package com.project.shop.model.Requests.User;

import com.project.shop.model.Enum.Roles;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class SetUserRoleRequest {

    UUID userId;

    Roles role;
}
