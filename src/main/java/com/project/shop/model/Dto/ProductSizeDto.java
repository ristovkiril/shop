package com.project.shop.model.Dto;

import com.project.shop.model.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ProductSizeDto {

    private UUID id;

    private ProductDto productId;

    private Size sizeId;

    private int quantity;

}
