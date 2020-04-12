package com.project.shop.model.relations;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.shop.model.Cart;
import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class CartProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    //Moze da ne treba tuka JSON IGNORE
    @ManyToOne
    @JsonManagedReference
    private Cart cart;

    //Moze da ne treba tuka JSON IGNORE
    @ManyToOne
    @JsonManagedReference
    private ProductSize productSize;

    private int quantity;

}
