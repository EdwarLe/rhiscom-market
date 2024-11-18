package com.test_rhiscom.market.model;

public class ProductoCantidad {
    private String productoId;
    private int cantidad;

    // Constructor sin argumentos
    public ProductoCantidad() {
    }

    // Constructor con argumentos
    public ProductoCantidad(String productoId, int cantidad) {
        this.productoId = productoId;
        this.cantidad = cantidad;
    }

    // Getters y Setters
    public String getProductoId() {
        return productoId;
    }

    public void setProductoId(String productoId) {
        this.productoId = productoId;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}