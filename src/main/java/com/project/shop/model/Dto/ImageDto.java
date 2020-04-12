package com.project.shop.model.Dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ImageDto {

    private UUID id;

    private String image;

    private boolean mainImage = false;
}
