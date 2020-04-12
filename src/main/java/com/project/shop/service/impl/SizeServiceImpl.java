package com.project.shop.service.impl;

import com.project.shop.model.Category;
import com.project.shop.model.Size;
import com.project.shop.repository.CategoryRepository;
import com.project.shop.repository.SizeRepository;
import com.project.shop.service.SizeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
public class SizeServiceImpl implements SizeService {

    private final SizeRepository repository;
    private final CategoryRepository categoryRepository;

    public SizeServiceImpl(SizeRepository repository, CategoryRepository categoryRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Size> getAllSizes() {
        return repository.findAll();
    }

    @Override
    public Page<Size> getAllSizesPaged(int page, int size) {
        return repository.findAll(PageRequest.of(page,size));
    }

    @Override
    public Size getSize(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Size createSize(Size size) {

        return repository.save(size);
    }

    @Override
    public Size update(Size size) {
        return repository.save(size);
    }

    @Override
    public List<Size> getAllSizesFromCatagory(UUID id) {
        return repository.findAllByCategory_Id(id);
    }

    @Override
    public Size getEmptySize() {
        return repository.save(new Size());
    }

    @Override
    public void delete(UUID id) {
        repository.deleteById(id);
    }
}
