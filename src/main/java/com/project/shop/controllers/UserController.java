package com.project.shop.controllers;


import com.project.shop.mappers.UserMapper;
import com.project.shop.model.Dto.UserToLoginDto;
import com.project.shop.model.Dto.UserLoginDto;
import com.project.shop.model.Dto.UserSetRoleDto;
import com.project.shop.model.Requests.User.ChangePasswordRequest;
import com.project.shop.model.Requests.User.EditUserRequest;
import com.project.shop.model.Requests.User.RegisterRequest;
import com.project.shop.model.Requests.User.SetUserRoleRequest;
import com.project.shop.model.User;
import com.project.shop.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/user", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class UserController {
    private final UserService userService;

    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping
    public Page<User> getAllUsersPaged(@RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "10")  int size){
        return userService.getAllUsersPaged(page,size);
    }

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable(name = "id") UUID id){
        return userService.getUser(id);
    }

    @GetMapping("/email")
    public User getUserByEmail(@RequestParam String email){
        return userService.findByEmail(email);
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/edit/{id}/changePassword")
    public User changePassword(@PathVariable(name = "id")UUID id,
                               @RequestBody ChangePasswordRequest changePasswordRequest,
                               HttpServletResponse response,
                               UriComponentsBuilder builder){
        response.setHeader("Location",
                builder.path("/{name}").buildAndExpand(changePasswordRequest.getUserId()).toUriString());

        return userService.changePassword(id, changePasswordRequest);
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/create")
    public User createNewUser(@RequestBody RegisterRequest registerRequest, HttpServletResponse response,
                              UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(registerRequest.getEmail()).toUriString());

        return userService.create(registerRequest);
    }

    @PatchMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/edit/{id}")
    public User editUser(@PathVariable(name = "id")UUID id, @RequestBody EditUserRequest editUserRequest,
                         HttpServletResponse response,
                         UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(editUserRequest.getEmail()).toUriString());

        return userService.update(id, editUserRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(name = "id") UUID id){
        userService.delete(id);
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/login")
    public UserLoginDto loginUser(@RequestBody UserToLoginDto userSetPasswordDto, HttpServletResponse response,
                                  UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(userSetPasswordDto.getEmail()).toUriString());

        return userService.login(userSetPasswordDto);
    }

    @GetMapping("/get/users")
    public List<UserSetRoleDto> getAllCustomersAndModerators(){
        return userMapper.getAllCustomersAndModerators();
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/edit/role")
    public User setUserToRole(@RequestBody SetUserRoleRequest userRoleRequest){
        return userService.changeUserRole(userRoleRequest);
    }

}
