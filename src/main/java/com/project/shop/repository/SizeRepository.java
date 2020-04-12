package com.project.shop.repository;

import com.project.shop.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SizeRepository extends JpaRepository<Size, UUID> {

    List<Size> findAllByCategory_Id(UUID id);
}
