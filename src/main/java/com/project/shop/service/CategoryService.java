package com.project.shop.service;

import com.project.shop.model.Category;
import com.project.shop.model.Requests.Category.CreateCategoryRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    List<Category> getAllCategories();

    Page<Category> getAllCategoriesPaged(int page, int size);

    Category getCategory(UUID id);

    Category createCategory(CreateCategoryRequest createCategoryRequest);

    Category update(UUID id, CreateCategoryRequest createCategoryRequest);

    void delete(UUID id);

    List<Category> getAllMainCategories();

    List<Category> getAllSubcategoriesFromCategory(UUID id);

}
