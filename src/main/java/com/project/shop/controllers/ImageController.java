package com.project.shop.controllers;

import com.project.shop.service.ProductImageService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping(path = "api/images", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
public class ImageController {
    private final ProductImageService imagesService;

    public ImageController(ProductImageService imagesService) {
        this.imagesService = imagesService;
    }

    @GetMapping("/locals/{imageId}")
    public ResponseEntity<byte[]> getProductImage(@PathVariable(name = "imageId") UUID imageId) {
        var image = imagesService.findProductImageById(imageId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, createHeaderValue(image.getId().toString()))
                .body(image.getImage());
    }

    private String createHeaderValue(String imageName) {
        return String.format("attachment; filename=\"%s\"", imageName);
    }
}
