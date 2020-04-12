package com.project.shop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.shop.model.relations.CartProduct;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private boolean status = false;

    private boolean delivered = false;

    @Column(name = "delivery_address")
    private String deliveryAddress;

    @ManyToOne
    @JsonManagedReference(value="user")
    private User user;

    @OneToMany(mappedBy = "cart")
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonBackReference
    private List<CartProduct> products = new ArrayList<>();

    @Column(name = "total_price")
    private double totalPrice = 0;

    @Column(name = "order_date")
    private LocalDateTime orderDate;
}
