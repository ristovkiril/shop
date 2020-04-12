package com.project.shop.model.relations;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class ProductSizeId implements Serializable {

    @Column(name = "product_id")
    private UUID productId;

    @Column(name = "size_id")
    private UUID sizeId;

}
