package com.test_rhiscom.market.service;

import com.test_rhiscom.market.model.Producto;
import com.test_rhiscom.market.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    @Transactional
    public Producto actualizarStock(String id, int nuevoStock) {
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        producto.setStock(nuevoStock);
        return productoRepository.save(producto);
    }

    public List<Producto> listarTodosLosProductos() {
        return productoRepository.findAll();
    }

    public Page<Producto> listarProductosPaginados(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productoRepository.findAll(pageable);
    }

    public Producto obtenerProductoPorId(String id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + id));
    }

    public Producto crearProducto(Producto producto) {
        return productoRepository.save(producto);
    }
    public void eliminarProducto(String id) {
        productoRepository.deleteById(id);
    }
}
