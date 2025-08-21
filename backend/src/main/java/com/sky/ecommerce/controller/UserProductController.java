package com.sky.ecommerce.controller;

import com.sky.ecommerce.exception.ProductException;
import com.sky.ecommerce.model.Product;
import com.sky.ecommerce.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserProductController {

    private ProductService productService;

    @Autowired
    public UserProductController(ProductService productService) {
        this.productService=productService;
    }


    @GetMapping("/products")
    public ResponseEntity<Page<Product>> findProductByCategoryHandler(
            @RequestParam(required = false) List<String> category,
            @RequestParam(required = false) List<String> color, 
            @RequestParam(required = false) List<String> size, 
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice, 
            @RequestParam(required = false) Integer minDiscount, 
            @RequestParam(defaultValue = "price_low") String sort,
            @RequestParam(required = false) String stock, 
            @RequestParam(defaultValue = "0") Integer pageNumber, 
            @RequestParam(defaultValue = "10") Integer pageSize
    ){
        Page<Product> res = productService.getAllProduct(category, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize);
        System.out.println("Complete products response sent.");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }



    @GetMapping("/products/id/{productId}")
    public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException {
        Product product=productService.findProductById(productId);
        return new ResponseEntity<Product>(product,HttpStatus.ACCEPTED);
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProductHandler(@RequestParam String q){
        List<Product> products=productService.searchProduct(q);
        return new ResponseEntity<List<Product>>(products,HttpStatus.OK);
    }
}
