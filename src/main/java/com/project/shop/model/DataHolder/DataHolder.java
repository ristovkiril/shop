package com.project.shop.model.DataHolder;

import com.project.shop.model.*;
import com.project.shop.model.Enum.Roles;
import com.project.shop.model.Requests.Cart.CreateCartProductRequest;
import com.project.shop.model.Requests.Category.CreateCategoryRequest;
import com.project.shop.model.Requests.Category.CreateCategorySizeRequest;
import com.project.shop.model.Requests.Product.CreateProductRequest;
import com.project.shop.model.Requests.Size.CreateSizeRequest;
import com.project.shop.model.Requests.User.RegisterRequest;
import com.project.shop.model.relations.CartProduct;
import com.project.shop.model.relations.ProductSize;
import com.project.shop.repository.relations.ProductImageRepository;
import com.project.shop.service.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class DataHolder implements CommandLineRunner {
    private final UserService userService;
    private final CategoryService categoryService;
    private final SizeService sizeService;
    private final ProductSizeService productSizeService;
    private final CartService cartService;
    private final CartProductService cartProductService;
    private final ProductService productService;
    private final ProductImageRepository productImageRepository;

    private final PasswordEncoder passwordEncoder;

    public DataHolder(UserService userService, CategoryService categoryService, SizeService sizeService, ProductSizeService productSizeService, CartService cartService, CartProductService cartProductService, ProductService productService, ProductImageRepository productImageRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.categoryService = categoryService;
        this.sizeService = sizeService;
        this.productSizeService = productSizeService;
        this.cartService = cartService;
        this.cartProductService = cartProductService;
        this.productService = productService;
        this.productImageRepository = productImageRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        var customer = createUser("Kiril", "Ristov", "11ti Oktomvri", "ristov@yahoo.com", "password", "070581901",
                Roles.CUSTOMER);
        var customer1 = createUser("test", "test", "test address", "test@yahoo.com", "password", "070581901",
                Roles.CUSTOMER);
        var moderator = createUser("Moderator", "Moderator", "Moderator", "moderator@yahoo.com", "password",
                "070123123",
                Roles.MODERATOR);
        var admin = createUser("Admin", "Admin", "admin", "admin@yahoo.com", "password", "070707070",
                Roles.ADMIN);

        var size1 = sizeService.getEmptySize();
        var sizeRequest1 = new CreateCategorySizeRequest();
        sizeRequest1.setId(size1.getId());
        sizeRequest1.setSize("S");

        var size2 = sizeService.getEmptySize();
        var sizeRequest2 = new CreateCategorySizeRequest();
        sizeRequest2.setId(size2.getId());
        sizeRequest2.setSize("M");

        var size3 = sizeService.getEmptySize();
        var sizeRequest3 = new CreateCategorySizeRequest();
        sizeRequest3.setId(size3.getId());
        sizeRequest3.setSize("L");

        var size4 = sizeService.getEmptySize();
        var sizeRequest4 = new CreateCategorySizeRequest();
        sizeRequest4.setId(size4.getId());
        sizeRequest4.setSize("XXL");

        var oblekaSizes = Arrays.asList(sizeRequest1,sizeRequest2,sizeRequest3, sizeRequest4);
        var categoryObleka = createCategory("Clothes", null, null);
        var categoryBluzi = createCategory("T-Shirt", categoryObleka, oblekaSizes);
        var categoryKosuli = createCategory("Shirt", categoryObleka, oblekaSizes);

        List<Size> sizesFromCatagory = sizeService.getAllSizesFromCatagory(categoryKosuli.getId());

        List<CreateSizeRequest> sizes = new ArrayList<>();
        var createSizeRequest1 = new CreateSizeRequest();
        var createSizeRequest2 = new CreateSizeRequest();
        var createSizeRequest3 = new CreateSizeRequest();

        createSizeRequest1.setSize(sizesFromCatagory.get(0).getId());
        createSizeRequest1.setQuantity(5);

        createSizeRequest2.setSize(sizesFromCatagory.get(1).getId());
        createSizeRequest2.setQuantity(5);

        createSizeRequest3.setSize(sizesFromCatagory.get(2).getId());
        createSizeRequest3.setQuantity(5);

        sizes.addAll(Arrays.asList(createSizeRequest1,createSizeRequest2,createSizeRequest3));

        var product = createProduct("Polo", "Soft cotton Polo T-Shirt", 1599, categoryBluzi, sizes);
        var product1 = createProduct("Levis", "Summer Classic Short Sleeves", 1999, categoryKosuli, sizes);

        var cart = cartService.getCartFromUserStatusFalse(customer.getId());
        var productSizes = productSizeService.getByProductAndSize(product.getId(), sizesFromCatagory.get(0).getId());

        var cart1 = cartService.getCartFromUserStatusFalse(customer1.getId());
        var productSizes1 = productSizeService.getByProductAndSize(product1.getId(), sizesFromCatagory.get(0).getId());


        createCartProduct(cart, productSizes, 2);
        createCartProduct(cart1, productSizes1, 1);

        readImages(product, new File("./src//main/resources/images/product-image-1017736454_1024x1024.jpg"));
        readImages(product1, new File("./src//main/resources/images/112407330-red-hawaiian-shirt-beach-summer-cloth-vector-flat-cartoon-shirt-isolated-on-white-background-.jpg"));
    }

    void readImages(Product product, File file){
        try {
            BufferedImage image = ImageIO.read(file);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            ImageIO.write(image,"jpg", outputStream);
            byte[] bytes = outputStream.toByteArray();

            ProductImage productImage = new ProductImage();
            productImage.setImage(bytes);
            productImage.setMainImage(true);
            productImage.setProductId(product);

            productImageRepository.save(productImage);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    User createUser(String name, String lastName, String address, String email, String password,
                           String phoneNumber, Roles role){
        var user = new RegisterRequest();
        user.setName(name);
        user.setLastName(lastName);
        user.setAddress(address);
        user.setEmail(email);
        user.setPassword(password);
        user.setPhoneNumber(phoneNumber);
        user.setRole(role);

        return userService.create(user);
    }

    Product createProduct(String name, String description, double price, Category category,
                                 List<CreateSizeRequest> sizes){
        CreateProductRequest product = new CreateProductRequest();

        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategoryId(category.getId());
        product.setSizes(sizes);

        return productService.createProduct(product);
    }

    Category createCategory(String name, Category subcategory, List<CreateCategorySizeRequest> sizes){
        CreateCategoryRequest category = new CreateCategoryRequest();
        category.setName(name);
        category.setMainCategory(subcategory == null ? null : subcategory.getId());
        category.setSizes(sizes);

        return categoryService.createCategory(category);
    }

    Size createSize(String name, Category category){
        Size size = new Size();
        size.setSize(name);
        size.setCategory(category);

        return sizeService.createSize(size);
    }

    CartProduct createCartProduct(Cart cart, ProductSize productSize, int quantity){
        CreateCartProductRequest cartProduct = new CreateCartProductRequest();
        cartProduct.setCartId(cart.getId());
        cartProduct.setProductSizeId(productSize.getId());
        cartProduct.setQuantity(quantity);

        return cartProductService.create(cartProduct);
    }
}
