package com.project.shop.repository.relations;

import com.project.shop.model.Product;
import com.project.shop.model.Size;
import com.project.shop.model.relations.ProductSize;
import com.project.shop.model.relations.ProductSizeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, UUID> {
    ProductSize findByProductIdAndSizeId(Product product, Size size);

    List<ProductSize> findAllBySizeId (Size size);

    List<ProductSize> findAllByProductId(Product product);

    List<ProductSize> findAllBySizeId_Id(UUID sizeId);

    List<ProductSize> findAllByProductId_Id(UUID productId);
}
