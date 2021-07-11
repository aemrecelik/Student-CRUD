package com.example.hibernateAndJpa.Entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;

@Data
@Entity
@Table(name = "districts")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class District {

    @Id
    @Column(name = "district_id")
    private Long id;

    @NotBlank
    @Column(name = "name")
    private String name;

    @JoinColumn(name = "city_id")
    private Long cityid;

}
