package com.project.shop.repository;

import com.project.shop.model.Category;
import com.project.shop.model.Product;
import com.project.shop.model.ProductImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    List<Product> findAllByCategory(Category category);

    Page<Product> findAllByCategory(Category category, Pageable pageable);

    Page<Product> findAllByCategorySubcategory(Category category, Pageable pageable);

    Page<Product> findAllByNameContains(String term, Pageable pageable);

}
