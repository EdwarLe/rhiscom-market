package com.test_rhiscom.market.repository;

import com.test_rhiscom.market.model.Orden;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;

public interface OrdenRepository extends MongoRepository<Orden, String> {

    @Query("{ 'fecha' : { $gte: ?0, $lte: ?1 } }")
    Page<Orden> findByFechaBetween(Date startDate, Date endDate, Pageable pageable);
}