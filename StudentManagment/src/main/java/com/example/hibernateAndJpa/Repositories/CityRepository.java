package com.example.hibernateAndJpa.Repositories;

import com.example.hibernateAndJpa.Entities.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
}
