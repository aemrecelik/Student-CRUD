package com.example.hibernateAndJpa.restApi;

import com.example.hibernateAndJpa.Entities.City;
import com.example.hibernateAndJpa.Entities.Student;
import com.example.hibernateAndJpa.Services.CityService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/cities")
@AllArgsConstructor
public class CityController {

    private final CityService cityService;

    @GetMapping
    public ResponseEntity<List<City>> getAllCities() {
        return status(HttpStatus.OK).body(cityService.getAll());
    }

    @PostMapping
    public ResponseEntity<Void> addCity(@RequestBody City city) {
        cityService.add(city);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
