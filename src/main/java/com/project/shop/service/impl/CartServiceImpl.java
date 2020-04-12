package com.project.shop.service.impl;

import com.project.shop.model.Cart;
import com.project.shop.model.Requests.Cart.CartEditRequest;
import com.project.shop.model.Requests.User.OrderRequest;
import com.project.shop.model.User;
import com.project.shop.model.relations.CartProduct;
import com.project.shop.model.relations.ProductSize;
import com.project.shop.repository.CartRepository;
import com.project.shop.repository.UserRepository;
import com.project.shop.repository.relations.CartProductRepository;
import com.project.shop.repository.relations.ProductSizeRepository;
import com.project.shop.service.CartService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartProductRepository cartProductRepository;
    private final ProductSizeRepository productSizeRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(CartRepository cartRepository, CartProductRepository cartProductRepository, ProductSizeRepository productSizeRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartProductRepository = cartProductRepository;
        this.productSizeRepository = productSizeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    @Override
    public Cart getCart(UUID id) {
        return cartRepository.findById(id).orElse(null);
    }

    @Override
    public Cart create(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    @Transactional
    public Cart update(CartEditRequest cartEditRequest) {
        var cart = cartRepository.findById(cartEditRequest.getId()).orElseThrow(RuntimeException::new);

        cart.setStatus(cartEditRequest.isStatus());
        cart.setDelivered(cartEditRequest.isDelivered());
        cart.setDeliveryAddress(cartEditRequest.getDeliveryAddress());
        cart.setTotalPrice(cartEditRequest.getTotalPrice());

        return cartRepository.save(cart);
    }

    @Override
    public void delete(UUID id) {
        cartRepository.deleteById(id);
    }

    @Override
    public Page<Cart> getAllCartsStatusTrue(int page, int size) {
        Pageable paged = PageRequest.of(page,size, Sort.by("orderDate").descending());
        return cartRepository.findAllByStatusTrue(paged);
    }

    @Override
    public List<Cart> getAllCartsFromUserStatusTrue(UUID id) {
        return cartRepository.findAllByUser_IdAndStatusTrue(id);
    }

    @Override
    public Cart getCartFromUserStatusFalse(UUID id) {
        return cartRepository.findByUser_IdAndStatusFalse(id);
    }

    @Override
    @Transactional
    public synchronized Cart createOrder(UUID id, List<CartProduct> cartProducts) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart not found"));

        //namaluvanje na product quantity da ne nastane greska
        synchronized (cart.getId()) {

            var products = cartProducts.stream().map(p -> {
                ProductSize productsSize =
                        productSizeRepository.findById(p.getProductSize().getId()).orElseThrow(() -> new RuntimeException("Product size not found"));

                if (productsSize.getQuantity() <= p.getQuantity()) {
                    productsSize.setQuantity(productsSize.getQuantity() - p.getQuantity());
                    //productSizeRepository.save(productsSize);
                }
                else {
                    throw new RuntimeException("Quantity error");
                }

                return productsSize;
            }).collect(Collectors.toList());

            productSizeRepository.saveAll(products);

        }
        cart.setStatus(true);
        cart.setOrderDate(Instant.now().atOffset(ZoneOffset.UTC).toLocalDateTime());

        User user = userRepository.findById(cart.getUser().getId()).orElseThrow(()-> new RuntimeException("User not " +
                "found"));

        Cart newCart = new Cart();
        newCart.setUser(user);
        user.getCarts().add(newCart);
        userRepository.save(user);

        return cart;
    }

    @Override
    @Transactional
    public Cart createOrderRequest(OrderRequest orderRequest) {

        Cart cart = cartRepository.findById(orderRequest.getCart().getId()).orElseThrow(RuntimeException::new);

        cart.setDeliveryAddress(orderRequest.getCart().getDeliveryAddress());
        cart.setTotalPrice(orderRequest.getCart().getTotalPrice());

        var cartProducts = orderRequest.getCartProducts().stream().map(cp -> {
            var cartProduct = cartProductRepository.findById(cp.getId()).orElseThrow(RuntimeException::new);
            cartProduct.setQuantity(cp.getQuantity());

            return cartProduct;
        }).collect(Collectors.toList());
        cart.setProducts(cartProducts);

        cartRepository.save(cart);

        cartProductRepository.saveAll(cartProducts);

        var products = orderRequest.getCartProducts().stream().map(p -> {
            var productsSize =
                    productSizeRepository.findById(p.getProductSizeId()).orElseThrow(RuntimeException::new);
            productsSize.setQuantity(productsSize.getQuantity() - p.getQuantity());
            //productSizeRepository.save(productsSize);

            return productsSize;
        }).collect(Collectors.toList());

        productSizeRepository.saveAll(products);

        cart.setStatus(true);
        cart.setOrderDate(Instant.now().atOffset(ZoneOffset.UTC).toLocalDateTime());

        User user = userRepository.findById(cart.getUser().getId()).orElseThrow(RuntimeException::new);

        Cart newCart = new Cart();
        newCart.setUser(user);
        cartRepository.save(newCart);

        user.getCarts().add(newCart);
        userRepository.save(user);

        return newCart;
    }
}
