package com.project.shop.controllers;

import com.project.shop.model.Size;
import com.project.shop.service.SizeService;
import org.springframework.data.domain.Page;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/size", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class SizeController {
    private final SizeService sizeService;

    public SizeController(SizeService sizeService) {
        this.sizeService = sizeService;
    }

    @GetMapping
    public Page<Size> getAllSizePaged(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size){
        return sizeService.getAllSizesPaged(page, size);
    }

    @GetMapping("/all")
    public List<Size> getAllSize(){
        return sizeService.getAllSizes();
    }

    @GetMapping("/{id}")
    public Size getSize(@PathVariable(name = "id") UUID id){
        return sizeService.getSize(id);
    }

    @PostMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, path = "/create")
    public Size createNewSize(@RequestBody Size size, HttpServletResponse response, UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(size.getId()).toUriString());

        return sizeService.createSize(size);
    }

    @PatchMapping(consumes = MimeTypeUtils.APPLICATION_JSON_VALUE)
    public Size editSize(@RequestBody Size size, HttpServletResponse response, UriComponentsBuilder builder){
        response.setHeader("Location", builder.path("/{name}").buildAndExpand(size.getId()).toUriString());

        return sizeService.update(size);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(name = "id")UUID id){
        sizeService.delete(id);
    }

    @GetMapping("/category/{id}")
    public List<Size> getAllSizesFromCategory(@PathVariable(name = "id") UUID id){
        return sizeService.getAllSizesFromCatagory(id);
    }

    @GetMapping("/empty")
    public Size getEmptySize(){
        return sizeService.getEmptySize();
    }
}
