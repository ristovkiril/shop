package com.project.shop.model.Requests.Category;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class CreateCategoryRequest {

    private String name;

    private UUID mainCategory = null;

    private List<CreateCategorySizeRequest> sizes = new ArrayList<>();
}
