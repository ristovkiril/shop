package com.project.shop.jobs;

import com.project.shop.service.ProductService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    private final ProductService productService;

    public ScheduledTasks(ProductService productService) {
        this.productService = productService;
    }

    @Scheduled(cron= "0 2 0 * * 7")
    public void refreshMViews() {
        productService.refreshViews();
    }

}
