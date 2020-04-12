package com.project.shop.repository;

import com.project.shop.model.Enum.Roles;
import com.project.shop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    User findByEmail(String term);

    List<User> findAllByRoleIsNot(Roles role);
}
