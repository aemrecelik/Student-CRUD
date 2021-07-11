package com.example.hibernateAndJpa.restApi;

import com.example.hibernateAndJpa.Entities.City;
import com.example.hibernateAndJpa.Entities.District;
import com.example.hibernateAndJpa.Services.CityService;
import com.example.hibernateAndJpa.Services.DistrictService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/districts")
@AllArgsConstructor
public class DistrictController {

    private final DistrictService districtService;

    @GetMapping
    public ResponseEntity<List<District>> getAllDistricts() {
        return status(HttpStatus.OK).body(districtService.getAll());
    }

    @PostMapping
    public ResponseEntity<Void> addDistrict(@RequestBody District district) {
        districtService.add(district);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
