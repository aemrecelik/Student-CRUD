package com.example.hibernateAndJpa.Services;

import com.example.hibernateAndJpa.Entities.City;
import com.example.hibernateAndJpa.Repositories.CityRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class CityService {

    private final CityRepository cityRepository;

    @Transactional
    public List<City> getAll() {
        return cityRepository.findAll();
    }

    @Transactional
    public void add(City city) {
        cityRepository.save(city);
    }
}
