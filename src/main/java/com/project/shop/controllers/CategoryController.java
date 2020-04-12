package com.project.shop.controllers;

import com.project.shop.model.Category;
import com.project.shop.model.Requests.Category.CreateCategoryRequest;
import com.project.shop.service.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/category", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @GetMapping
    public Page<Category> getAllCategoriesPaged(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue =
            "10") int size){
        return categoryService.getAllCategoriesPaged(page, size);
    }

    @GetMapping("/all")
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getCategory(@PathVariable(name = "id") UUID id){
        return categoryService.getCategory(id);
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/create")
    public Category createNewCategory(@RequestBody CreateCategoryRequest category, HttpServletResponse response,
                                      UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(category.getName()).toUriString());

        return categoryService.createCategory(category);
    }

    @PatchMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/{id}")
    public Category editCategory(@PathVariable(name = "id")UUID id ,@RequestBody CreateCategoryRequest category,
            HttpServletResponse response,
                                 UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(category.getName()).toUriString());

        return categoryService.update(id, category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(name = "id")UUID id){
        categoryService.delete(id);
    }

    @GetMapping("/main")
    public List<Category> getAllMainCategories(){
        return categoryService.getAllMainCategories();
    }

    @GetMapping("/subcategories/{id}")
    public List<Category> getAllSubcategoriesFromCategory(@PathVariable(name = "id")UUID id){
        return categoryService.getAllSubcategoriesFromCategory(id);
    }
}
