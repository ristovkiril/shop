package com.project.shop.repository;

import com.project.shop.model.Category;
import com.project.shop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    List<Category> findAllBySubcategoryIsNull();

    List<Category> findAllBySubcategory_Id(UUID id);

}
