package com.test_rhiscom.market.repository;

import com.test_rhiscom.market.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductoRepository extends MongoRepository<Producto, String> {
}