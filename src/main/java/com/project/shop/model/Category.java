package com.project.shop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotBlank
    private String name;

    @ManyToOne
    @JoinColumn(name = "subcategory", referencedColumnName = "Id")
    @JsonManagedReference
    private Category subcategory;

    @OneToMany(mappedBy = "subcategory",  cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Category> children = new HashSet<>();

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private Set<Product> products = new HashSet<>();

    @OneToMany(mappedBy = "category")
    @JsonBackReference
    private Set<Size> sizes = new HashSet<>();

}
