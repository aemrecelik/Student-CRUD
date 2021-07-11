package com.example.hibernateAndJpa.Entities;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;


@Data
@Entity
@Table(name = "students")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Student {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "name")
    private String name;

    @NotBlank
    @Column(name = "surname")
    private String surname;

    @NotBlank
    @Column(name = "mobilPhoneNumber")
    private String mobilePhoneNumber;

    @NotBlank
    @Column(name = "city")
    private String city;

    @NotBlank
    @Column(name = "district")
    private String district;

//    @ManyToOne
//    @JoinColumn(name = "file_id")
//    private UploadedFiles files;

//    @OneToOne()
//    @JoinColumn(name = "city_id")
//    private City city;

//    @OneToOne()
//    @JoinColumn(name = "district_id")
//    private District district;

    @Nullable
    @Column(name = "description")
    private String description;


}
