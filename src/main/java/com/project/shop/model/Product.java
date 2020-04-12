package com.project.shop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.shop.model.relations.ProductSize;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.jpa.repository.Lock;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    private LocalDateTime date = Instant.now().atOffset(ZoneOffset.UTC).toLocalDateTime();

    private double price;

    @ManyToOne
    @JsonManagedReference
    private Category category;

    @OneToMany(mappedBy = "productId", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ProductSize> sizes = new ArrayList<>();

    @OneToMany(mappedBy = "productId", orphanRemoval = true)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonManagedReference
    private List<ProductImage> images = new ArrayList<>();

    private Long views = 0L;

    private static Object lock = new Object();

    public long increaseViews () {
        return ++views;
    }
}
