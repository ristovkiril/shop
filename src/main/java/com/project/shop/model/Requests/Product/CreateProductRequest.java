package com.project.shop.model.Requests.Product;

import com.project.shop.model.Requests.Size.CreateSizeRequest;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class CreateProductRequest {

    @NotBlank
    private String name;

    private String description;

    private double price;

    private UUID categoryId;

    private List<CreateSizeRequest> sizes;

}
