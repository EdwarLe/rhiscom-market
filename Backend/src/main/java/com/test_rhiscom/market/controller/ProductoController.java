package com.test_rhiscom.market.controller;

import com.test_rhiscom.market.model.Producto;
import com.test_rhiscom.market.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;

    @GetMapping("/todos")
    public List<Producto> listarTodosLosProductos() {
        return productoService.listarTodosLosProductos();
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/paginados")
    public Page<Producto> listarProductosPaginados(
            @RequestParam int page,
            @RequestParam int size) {
        return productoService.listarProductosPaginados(page, size);
    }

    @GetMapping("/{id}")
    public Producto obtenerProductoPorId(@PathVariable String id) {
        return productoService.obtenerProductoPorId(id);
    }

    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoService.crearProducto(producto);
    }

    @PutMapping("/{id}/stock")
    public Producto actualizarStock(@PathVariable String id, @RequestParam int stock) {
        return productoService.actualizarStock(id, stock);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable String id) {
        productoService.eliminarProducto(id);
    }
}