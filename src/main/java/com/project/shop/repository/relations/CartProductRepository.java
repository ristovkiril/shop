package com.project.shop.repository.relations;

import com.project.shop.model.Cart;
import com.project.shop.model.relations.CartProduct;
import com.project.shop.model.relations.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CartProductRepository extends JpaRepository<CartProduct, UUID> {

    CartProduct findByCartAndProductSize(Cart cart, ProductSize productSize);

    CartProduct findByCartIdAndProductSizeId(UUID cartId, UUID sizeId);

    List<CartProduct> findAllByCart_Id(UUID id);
}
