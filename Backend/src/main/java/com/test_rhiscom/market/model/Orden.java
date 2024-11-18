package com.test_rhiscom.market.model;

import java.util.Date;
import java.util.List;

public class Orden {
    private String id;
    private Date fecha;
    private double total;
    private List<ProductoCantidad> productos;

    // Constructor
    public Orden(String id, Date fecha, double total, List<ProductoCantidad> productos) {
        this.id = id;
        this.fecha = fecha;
        this.total = total;
        this.productos = productos;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public List<ProductoCantidad> getProductos() {
        return productos;
    }

    public void setProductos(List<ProductoCantidad> productos) {
        this.productos = productos;
    }
}