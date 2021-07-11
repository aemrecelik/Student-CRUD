package com.example.hibernateAndJpa.Services;

import com.example.hibernateAndJpa.Entities.District;
import com.example.hibernateAndJpa.Repositories.DistrictRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class DistrictService {

    private final DistrictRepository districtRepository;

    @Transactional
    public List<District> getAll() {
        return districtRepository.findAll();
    }

    @Transactional
    public void add(District district) {
        districtRepository.save(district);
    }

}
