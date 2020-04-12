package com.project.shop.model.Requests.Size;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CreateSizeRequest {

    private UUID size;

    private int quantity = 0;
}
