package com.project.shop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.shop.model.relations.ProductSize;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Category_Sizes")
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Size {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    //@NotBlank
    private String size;

    @ManyToOne
    @JsonManagedReference
    private Category category;


    @OneToMany(mappedBy = "sizeId", cascade = CascadeType.ALL)
    @JsonBackReference
    List<ProductSize> products = new ArrayList<>();
}
