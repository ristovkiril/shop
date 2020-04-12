package com.project.shop.model.relations;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.shop.model.Product;
import com.project.shop.model.Size;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class ProductSize {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JsonManagedReference
    private Product productId;

    @ManyToOne
    @JsonManagedReference
    private Size sizeId;

    private int quantity;

    @OneToMany(mappedBy = "productSize", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CartProduct> cartProducts = new ArrayList<>();
}
