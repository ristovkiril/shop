package com.project.shop.model.Requests.Category;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CreateCategorySizeRequest {
    private UUID id;
    private String size;
}
