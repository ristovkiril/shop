# Веб Програмирање Проект - ФИНКИ

## Веб Страна за онлине купување


<h1>SHOP</h1>

---

### Содржина

   * [Краток опис на страната](#Краток-опис-на-страната)
   * [Упатство за стартување](#Упатство-за-стартување)
   * [Делови од кодот](#Делови-од-кодот)
   * [Дополнителни технологии](#Дополнителни-технологии)
   * [Користени Библиотеки](#Користени-библиотеки)
   * [Изработиле](#Изработиле)

<hr>
<br>


### Краток опис на страната

Веб страна каде може да си нарачате продукти. На страната може да се најави обичен корисник, модератор (кој има одредени можности за извршување) и админ (кој ги има сите пермисии). Админот и модераторот може да креират и модифицираат продукти. Админот исто така може да додеда корисник да биде модератор и обратно, таа пермисија ја има само админот. Додека корисникот може само да купува продукти. Еден продукт може да биде од една подкатегорија.

<hr>

### Упатство за стартување

За оваа страна на бекенд Spring boot со Rest контролери а за фронтенд користам React js. За база на податоци користам Hibernate датабаза. Исто така користам и Spring security за заштита на страната. Страната се стартува со стартување на Spring boot апликацијата и стартување на React.

### Делови од кодот

* Дел од кодот

Користам Scheduling за избирање на најпосетуваните продукти за секоја недела.

```
	
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

```
* Како изгледа refreshViews():
```
	@Override
    public void refreshViews() {
        var products = repository.findAll();

        products.forEach(p -> {
            p.setViews(0L);
        });

        repository.saveAll(products);
    }

```


* Исто така некој податоци ги заштитувам при нивна промена:
```

    @Override
    public Product increaseViews(UUID id) {
        var product = repository.findById(id).orElseThrow(RuntimeException::new);
        synchronized (product.getViews()) {
            product.increaseViews();
        }
        return repository.save(product);
    }

```

* На фронтенд страниците се full-responsive со помош на bootstrap 4 и неговите опции како :
```
	col-sm-[1-12]	p-sm-[1-5]	m-sm-[1-5]
	col-md-[1-12]	p-md-[1-5]	m-md-[1-5]
	col-lg-[1-12]	p-lg-[1-5]	m-lg-[1-5]
```

### Дополнителни технологии

Како дополнителни технологии користам Spring Security каде ги штитам некој повици до контролерите, исто така користам и Chart.js каде што исцртувам графици за некои податоци.

### Користени Библиотеки

1. https://courses.finki.ukim.mk
2. https://getbootstrap.com/docs/4.1/getting-started/introduction/
3. https://www.w3schools.com/
4. https://www.baeldung.com/
5. https://spring.io/
6. https://howtodoinjava.com/
7. https://youtube.com/

### Изработил:
1. Кирил Ристов (173217)
