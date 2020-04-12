package com.project.shop.service;

import com.project.shop.model.Size;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface SizeService {

    List<Size> getAllSizes();

    Page<Size> getAllSizesPaged(int page, int size);

    Size getSize(UUID id);

    Size createSize(Size size);

    Size update(Size size);

    List<Size> getAllSizesFromCatagory(UUID id);

    Size getEmptySize();

    void delete(UUID id);
}
