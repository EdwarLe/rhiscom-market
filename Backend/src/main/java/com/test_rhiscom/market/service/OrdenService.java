package com.test_rhiscom.market.service;

import com.test_rhiscom.market.model.Orden;
import com.test_rhiscom.market.model.Producto;
import com.test_rhiscom.market.model.ProductoCantidad;
import com.test_rhiscom.market.repository.OrdenRepository;
import com.test_rhiscom.market.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class OrdenService {

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Transactional
    public Orden crearOrden(Orden orden) {
        double total = 0.0;

        for (ProductoCantidad pc : orden.getProductos()) {
            Producto producto = productoRepository.findById(pc.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + pc.getProductoId()));
            if (producto.getStock() < pc.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
            }
            producto.setStock(producto.getStock() - pc.getCantidad());
            productoRepository.save(producto);
            total += producto.getPrecio() * pc.getCantidad();
        }

        orden.setTotal(total);
        orden.setFecha(new Date());
        return ordenRepository.save(orden);
    }

    public Orden obtenerOrden(String id) {
        return ordenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada: " + id));
    }

    public List<Orden> obtenerTodasLasOrdenes() {
        return ordenRepository.findAll();
    }

    public void eliminarOrden(String id) {
        ordenRepository.deleteById(id);
    }

    public Orden actualizarOrden(Orden orden) {
        return ordenRepository.save(orden);
    }

    public Page<Orden> listarOrdenes(int page, int size, Date startDate, Date endDate) {
        Pageable pageable = PageRequest.of(page, size);
        return ordenRepository.findByFechaBetween(startDate, endDate, pageable);
    }

}