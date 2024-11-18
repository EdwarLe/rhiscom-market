package com.test_rhiscom.market;

import com.test_rhiscom.market.model.Producto;
import com.test_rhiscom.market.model.Orden;
import com.test_rhiscom.market.model.ProductoCantidad;
import com.test_rhiscom.market.model.Usuario;
import com.test_rhiscom.market.repository.ProductoRepository;
import com.test_rhiscom.market.repository.OrdenRepository;
import com.test_rhiscom.market.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        List<Producto> productos = new ArrayList<>();
        for (int i = 1; i <= 30; i++) {
            productos.add(new Producto(String.valueOf(i), "Producto " + i, 10.0 * i, 100 * i));
        }
        productoRepository.saveAll(productos);

        List<Orden> ordenes = new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        Random random = new Random();
        for (int i = 1; i <= 20; i++) {
            List<ProductoCantidad> productosOrden = new ArrayList<>();
            for (int j = 1; j <= 3; j++) {
                productosOrden.add(new ProductoCantidad(String.valueOf(j), j));
            }
            calendar.setTime(new Date());
            calendar.add(Calendar.DAY_OF_MONTH, random.nextInt(10)); // Asignar una fecha aleatoria dentro de los próximos 10 días
            Orden orden = new Orden(String.valueOf(i), calendar.getTime(), 30.0 * i, productosOrden);
            ordenes.add(orden);
        }
        ordenRepository.saveAll(ordenes);

        // Insertar usuarios de prueba
        Usuario usuario1 = new Usuario("1", "user1", passwordEncoder.encode("password1"), "USER");
        Usuario usuario2 = new Usuario("2", "user2", passwordEncoder.encode("password2"), "USER");
        Usuario admin = new Usuario("3", "admin", passwordEncoder.encode("adminpassword"), "ADMIN");

        usuarioRepository.saveAll(Arrays.asList(usuario1, usuario2, admin));
    }
}
