package com.example.hibernateAndJpa.Repositories;

import com.example.hibernateAndJpa.Entities.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistrictRepository extends JpaRepository<District,Long> {
}
