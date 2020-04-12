package com.project.shop.service;


import com.project.shop.model.Dto.UserToLoginDto;
import com.project.shop.model.Dto.UserLoginDto;
import com.project.shop.model.Requests.User.ChangePasswordRequest;
import com.project.shop.model.Requests.User.EditUserRequest;
import com.project.shop.model.Requests.User.RegisterRequest;
import com.project.shop.model.Requests.User.SetUserRoleRequest;
import com.project.shop.model.User;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface UserService {

    List<User> getAllUsers();

    Page<User> getAllUsersPaged(int page, int size);

    User findByEmail(String term);

    User getUser(UUID id);

    User create(RegisterRequest registerRequest);

    User update(UUID id, EditUserRequest editUserRequest);

    void delete(UUID id);

    User changePassword(UUID id, ChangePasswordRequest changePasswordRequest);

    UserLoginDto login(UserToLoginDto userSetPasswordDto);

    User changeUserRole (SetUserRoleRequest userRoleRequest);

}
