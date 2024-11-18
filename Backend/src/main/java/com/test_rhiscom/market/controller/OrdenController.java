package com.test_rhiscom.market.controller;

import com.test_rhiscom.market.model.Orden;
import com.test_rhiscom.market.service.OrdenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/ordenes")
public class OrdenController {

    @Autowired
    private OrdenService ordenService;

    @PostMapping
    public Orden crearOrden(@RequestBody Orden orden) {
        return ordenService.crearOrden(orden);
    }

    @GetMapping("/{id}")
    public Orden obtenerOrden(@PathVariable String id) {
        return ordenService.obtenerOrden(id);
    }

    @GetMapping("/total")
    public Page<Orden> listarOrdenes(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        return ordenService.listarOrdenes(page, size, startDate, endDate);
    }

}