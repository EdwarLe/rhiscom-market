package com.test_rhiscom.market.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.test_rhiscom.market.model.Orden;
import com.test_rhiscom.market.model.Producto;
import com.test_rhiscom.market.model.ProductoCantidad;
import com.test_rhiscom.market.repository.OrdenRepository;
import com.test_rhiscom.market.repository.ProductoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.Optional;
import java.util.List;

public class OrdenServiceTest {

    @Mock
    private OrdenRepository ordenRepository;

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private OrdenService ordenService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCrearOrdenConStockInsuficiente() {
        Producto producto = new Producto("1", "Carro", 3.5, 5);

        when(productoRepository.findById("1")).thenReturn(Optional.of(producto));

        ProductoCantidad pc = new ProductoCantidad();
        pc.setProductoId("1");
        pc.setCantidad(10);

        Date fecha = new Date();
        Orden orden = new Orden("2", fecha, 45.7, List.of(pc));

        Exception exception = assertThrows(RuntimeException.class, () -> {
            ordenService.crearOrden(orden);
        });

        assertEquals("Stock insuficiente para el producto: Carro", exception.getMessage());
    }

    @Test
    public void testObtenerOrden() {
        Date fecha = new Date();
        Orden orden = new Orden("2", fecha, 45.7, List.of());

        when(ordenRepository.findById("2")).thenReturn(Optional.of(orden));

        Orden result = ordenService.obtenerOrden("2");

        assertNotNull(result);
        assertEquals("2", result.getId());
    }

    @Test
    public void testObtenerTodasLasOrdenes() {
        Date fecha = new Date();
        Orden orden1 = new Orden("1", fecha, 45.7, List.of());
        Orden orden2 = new Orden("2", fecha, 55.7, List.of());

        when(ordenRepository.findAll()).thenReturn(List.of(orden1, orden2));

        List<Orden> result = ordenService.obtenerTodasLasOrdenes();

        assertEquals(2, result.size());
    }

    @Test
    public void testEliminarOrden() {
        doNothing().when(ordenRepository).deleteById("1");

        ordenService.eliminarOrden("1");

        verify(ordenRepository, times(1)).deleteById("1");
    }

    @Test
    public void testActualizarOrden() {
        Date fecha = new Date();
        Orden orden = new Orden("1", fecha, 45.7, List.of());

        when(ordenRepository.save(orden)).thenReturn(orden);

        Orden result = ordenService.actualizarOrden(orden);

        assertEquals("1", result.getId());
    }

    @Test
    public void testListarOrdenes() {
        Date startDate = new Date();
        Date endDate = new Date();
        Pageable pageable = PageRequest.of(0, 10);
        Orden orden1 = new Orden("1", startDate, 45.7, List.of());
        Orden orden2 = new Orden("2", endDate, 55.7, List.of());
        Page<Orden> page = new PageImpl<>(List.of(orden1, orden2));

        when(ordenRepository.findByFechaBetween(startDate, endDate, pageable)).thenReturn(page);

        Page<Orden> result = ordenService.listarOrdenes(0, 10, startDate, endDate);

        assertEquals(2, result.getTotalElements());
    }
}