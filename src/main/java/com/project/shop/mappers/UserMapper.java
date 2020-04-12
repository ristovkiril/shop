package com.project.shop.mappers;

import com.project.shop.model.Dto.UserSetRoleDto;

import java.util.List;

public interface UserMapper {

    List<UserSetRoleDto> getAllCustomersAndModerators();

}
