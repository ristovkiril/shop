package com.project.shop.service.impl;

import com.project.shop.model.Cart;
import com.project.shop.model.Product;
import com.project.shop.model.Requests.Cart.CreateCartProductRequest;
import com.project.shop.model.relations.CartProduct;
import com.project.shop.model.relations.ProductSize;
import com.project.shop.repository.CartRepository;
import com.project.shop.repository.ProductRepository;
import com.project.shop.repository.relations.CartProductRepository;
import com.project.shop.repository.relations.ProductSizeRepository;
import com.project.shop.service.CartProductService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
public class CartProductServiceImpl implements CartProductService {
    private final CartProductRepository cartProductRepository;
    private final CartRepository cartRepository;
    private final ProductSizeRepository productSizeRepository;
    private final ProductRepository productRepository;

    public CartProductServiceImpl(CartProductRepository cartProductRepository, ProductSizeRepository productSizeRepository, CartRepository cartRepository, ProductRepository productRepository) {
        this.cartProductRepository = cartProductRepository;
        this.cartRepository = cartRepository;
        this.productSizeRepository = productSizeRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<CartProduct> getAllCartProducts() {
        return cartProductRepository.findAll();
    }

    @Override
    public List<CartProduct> getAllCartProductsPaged(int page, int size) {
        return cartProductRepository.findAll(PageRequest.of(page,size)).toList();
    }

    @Override
    public CartProduct getCartProduct(UUID id) {
        return cartProductRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public CartProduct create(CreateCartProductRequest cartProductRequest) {
        Cart cart = cartRepository.findById(cartProductRequest.getCartId()).orElseThrow(() -> new RuntimeException(
                "cart not found"));
        ProductSize productSize =
                productSizeRepository.findById(cartProductRequest.getProductSizeId()).orElseThrow(() -> new RuntimeException("Product size not found"));
        Product product =
                productRepository.findById(productSize.getProductId().getId()).orElseThrow(() -> new RuntimeException("Product repository not found"));

        if(productSize.getQuantity() < cartProductRequest.getQuantity()){
            throw new RuntimeException("Product cart quantity > product size quantity");
        }

        CartProduct cartProduct = new CartProduct();
        cartProduct.setCart(cart);
        cartProduct.setProductSize(productSize);
        cartProduct.setQuantity(cartProductRequest.getQuantity());

        double totalPrice = cart.getTotalPrice() + (product.getPrice() * cartProductRequest.getQuantity());
        cart.setTotalPrice(totalPrice);
        cartRepository.save(cart);

        return cartProductRepository.save(cartProduct);
    }

    @Override
    public CartProduct update(CartProduct cartProduct) {
        return cartProductRepository.save(cartProduct);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        CartProduct cartProduct = cartProductRepository.findById(id).orElseThrow(() -> new RuntimeException());

        Cart cart = cartRepository.findById(cartProduct.getCart().getId()).orElseThrow(() -> new RuntimeException());
        ProductSize productSize =
                productSizeRepository.findById(cartProduct.getProductSize().getId()).orElseThrow(() -> new RuntimeException());
        Product product =
                productRepository.findById(productSize.getProductId().getId()).orElseThrow(() -> new RuntimeException());

        double totalPrice = cart.getTotalPrice() - (product.getPrice() * cartProduct.getQuantity());
        cart.setTotalPrice(totalPrice);

        cartProductRepository.deleteById(id);
    }

    @Override
    public CartProduct getByCartAndProduct(Cart cart, ProductSize productSize) {
        return cartProductRepository.findByCartAndProductSize(cart, productSize);
    }

    @Override
    public List<CartProduct> findAllProductsFromCart(UUID id) {
        return cartProductRepository.findAllByCart_Id(id);
    }
}
