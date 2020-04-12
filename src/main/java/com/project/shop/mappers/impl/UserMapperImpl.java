package com.project.shop.mappers.impl;

import com.project.shop.mappers.UserMapper;
import com.project.shop.model.Dto.UserSetRoleDto;
import com.project.shop.model.Enum.Roles;
import com.project.shop.model.User;
import com.project.shop.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapperImpl implements UserMapper {

    private final UserRepository userRepository;

    public UserMapperImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserSetRoleDto> getAllCustomersAndModerators() {

        var users = userRepository.findAllByRoleIsNot(Roles.ADMIN).stream()
                .map(u -> {
                    var userDto = new UserSetRoleDto();
                    userDto.setUserId(u.getId());
                    userDto.setEmail(u.getEmail());
                    userDto.setRole(u.getRole());

                    return userDto;
                }).collect(Collectors.toList());

        return users;
    }
}
