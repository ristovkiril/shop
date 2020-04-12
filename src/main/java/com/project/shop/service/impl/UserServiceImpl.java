package com.project.shop.service.impl;

import com.project.shop.model.Cart;
import com.project.shop.model.Dto.UserDto;
import com.project.shop.model.Dto.UserToLoginDto;
import com.project.shop.model.Dto.UserLoginDto;
import com.project.shop.model.Enum.Roles;
import com.project.shop.model.Requests.User.ChangePasswordRequest;
import com.project.shop.model.Requests.User.EditUserRequest;
import com.project.shop.model.Requests.User.RegisterRequest;
import com.project.shop.model.Requests.User.SetUserRoleRequest;
import com.project.shop.model.User;
import com.project.shop.repository.CartRepository;
import com.project.shop.repository.UserRepository;
import com.project.shop.repository.relations.CartProductRepository;
import com.project.shop.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final CartRepository cartRepository;
    private final CartProductRepository cartProductRepository;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository repository, CartRepository cartRepository, CartProductRepository cartProductRepository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.cartRepository = cartRepository;
        this.cartProductRepository = cartProductRepository;

        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public Page<User> getAllUsersPaged(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    @Override
    public User findByEmail(String term) {
        return repository.findByEmail(term);
    }

    @Override
    public User getUser(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public User create(RegisterRequest registerRequest) {
        var user = new User();

        Cart cart = new Cart();
        cart.setUser(user);
        cartRepository.save(cart);

        user.setName(registerRequest.getName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setRole(registerRequest.getRole());
        user.setAddress(registerRequest.getAddress());
        user.setPhoneNumber(registerRequest.getPhoneNumber());

        user.getCarts().add(cart);
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        if(user.getRole() == null) {
            user.setRole(Roles.CUSTOMER);
        }
        return repository.save(user);
    }

    @Override
    public User update(UUID id, EditUserRequest editUserRequest) {
        var user = repository.findById(id).orElseThrow(RuntimeException::new);

        user.setName(editUserRequest.getName());
        user.setLastName(editUserRequest.getLastName());
        user.setEmail(editUserRequest.getEmail());
        user.setPhoneNumber(editUserRequest.getPhoneNumber());
        user.setAddress(editUserRequest.getAddress());

        return repository.save(user);
    }

    @Override
    public void delete(UUID id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public User changePassword(UUID id ,ChangePasswordRequest changePasswordRequest) {
        User user = repository.findById(id).orElseThrow(RuntimeException::new);
        if (passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())){
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        }
        return repository.save(user);
    }

    @Override
    public UserLoginDto login(UserToLoginDto userSetPasswordDto) {

        User user = repository.findByEmail(userSetPasswordDto.getEmail());

        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if (!passwordEncoder.matches(userSetPasswordDto.getPassword(), user.getPassword())){
            throw new RuntimeException("Wrong password");
        }

        Cart cart = cartRepository.findByUser_IdAndStatusFalse(user.getId());

        if (cart == null) {
            throw new RuntimeException("Cart not found");
        }

        var cartProducts = cartProductRepository.findAllByCart_Id(cart.getId());
        int totalProducts = 0;
        if (cartProducts != null && cartProducts.size() > 0){
            totalProducts = cartProducts.size();
        }

        UserDto userDto = new UserDto();

        userDto.setAddress(user.getAddress());
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setLastName(user.getLastName());
        userDto.setName(user.getName());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setRole(user.getRole());

        UserLoginDto userLoginDto = new UserLoginDto();

        userLoginDto.setUser(userDto);
        userLoginDto.setCart(cart);
        userLoginDto.setTotalProducts(totalProducts);


        return userLoginDto;
    }

    @Override
    @Transactional
    public User changeUserRole(SetUserRoleRequest userRoleRequest) {
        var user = repository.findById(userRoleRequest.getUserId()).orElseThrow(RuntimeException::new);
        user.setRole(userRoleRequest.getRole() == Roles.CUSTOMER? Roles.CUSTOMER : Roles.MODERATOR);

        return repository.save(user);
    }

}
