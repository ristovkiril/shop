package com.project.shop.service.impl;

import com.project.shop.model.Category;
import com.project.shop.model.Requests.Category.CreateCategoryRequest;
import com.project.shop.model.Size;
import com.project.shop.repository.CategoryRepository;
import com.project.shop.repository.SizeRepository;
import com.project.shop.service.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;
    private final SizeRepository sizeRepository;

    public CategoryServiceImpl(CategoryRepository repository, SizeRepository sizeRepository) {
        this.repository = repository;
        this.sizeRepository = sizeRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    @Override
    public Page<Category> getAllCategoriesPaged(int page, int size) {
        return repository.findAll(PageRequest.of(page,size));
    }

    @Override
    public Category getCategory(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Category createCategory(CreateCategoryRequest createCategoryRequest) {
        //create category
        var categoryRequest = new Category();
        categoryRequest.setName(createCategoryRequest.getName());
        if(createCategoryRequest.getMainCategory() != null){
            var sub = repository.findById(createCategoryRequest.getMainCategory()).orElseThrow(RuntimeException::new);
            categoryRequest.setSubcategory(sub);
        }
        var category = repository.save(categoryRequest);
        //create sizes
        if(createCategoryRequest.getSizes() != null) {
            List<Size> lista = createCategoryRequest.getSizes().stream().map(s -> {
                var size = sizeRepository.findById(s.getId()).orElse(new Size());

                size.setSize(s.getSize());
                size.setCategory(category);

                return size;
            }).collect(Collectors.toList());

            sizeRepository.saveAll(lista);
        }

        return repository.save(category);
    }

    @Override
    public Category update(UUID id, CreateCategoryRequest createCategoryRequest) {
        //create category
        var categoryRequest = repository.findById(id).orElseThrow(RuntimeException::new);
        categoryRequest.setName(createCategoryRequest.getName());
        if(createCategoryRequest.getMainCategory() != null){
            var sub = repository.findById(createCategoryRequest.getMainCategory()).orElseThrow(RuntimeException::new);
            categoryRequest.setSubcategory(sub);
        }
        var category = repository.save(categoryRequest);
        //create sizes
        if(createCategoryRequest.getSizes() != null) {
            List<Size> lista = createCategoryRequest.getSizes().stream().map(s -> {
                var size = sizeRepository.findById(s.getId()).orElse(new Size());

                size.setSize(s.getSize());
                size.setCategory(category);

                return size;
            }).collect(Collectors.toList());

            sizeRepository.saveAll(lista);
        }

        return repository.save(category);
    }

    @Override
    public void delete(UUID id) {
        repository.deleteById(id);
    }

    @Override
    public List<Category> getAllMainCategories() {
        return repository.findAllBySubcategoryIsNull();
    }

    @Override
    public List<Category> getAllSubcategoriesFromCategory(UUID id) {
        return repository.findAllBySubcategory_Id(id);
    }
}
