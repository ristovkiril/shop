package com.project.shop.model.Dto;

import com.project.shop.model.Category;
import com.project.shop.model.Size;
import com.project.shop.model.relations.ProductSize;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ProductDto {

    private UUID id;

    private String name;

    private String description;

    private String mainImage;

    private double price;

    private Category category;

    private List<ImageDto> images = new ArrayList<>();

    private List<ProductSize> sizes = new ArrayList<>();

}
