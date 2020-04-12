package com.project.shop.repository;

import com.project.shop.model.Cart;
import com.project.shop.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<Cart, UUID> {

//    List<Cart> findAllByUserAndStatusTrue(User user);

//    Cart findByUserAndStatusFalse(User user);

    //List<Cart> findAllByUserIdAndStatusTrue(UUID id);

    Page<Cart> findAllByStatusTrue(Pageable pageable);

    List<Cart> findAllByUser_IdAndStatusTrue(UUID id);

    Cart findByUser_IdAndStatusFalse(UUID id);
}
