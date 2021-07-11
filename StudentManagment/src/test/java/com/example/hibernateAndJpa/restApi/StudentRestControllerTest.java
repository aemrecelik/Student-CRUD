package com.example.hibernateAndJpa.restApi;

import com.example.hibernateAndJpa.Entities.Student;
import com.example.hibernateAndJpa.Repositories.StudentRepository;
import com.example.hibernateAndJpa.Services.StudentService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;


@RunWith(SpringRunner.class)
@ComponentScan(basePackages = {"com.mypackage"})
@SpringBootTest
@AutoConfigureMockMvc
public class StudentRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentRepository studentRepository;
    private StudentService studentService;

    @Test
    public void testListStudents() throws Exception {
        List<Student> studentList = new ArrayList<>();
        studentList.add(new Student(1L, "Emre", "Çelik", "+905555555555", "Ankara", "Sincan", "asdasdasd"));
        studentList.add(new Student(2L, "Ahmet", "Çelik", "+905555555555", "Ankara", "Sincan", "asdasdasd"));
        studentList.add(new Student(3L, "Hüseyin", "Çelik", "+905555555555", "Ankara", "Sincan", "asdasdasd"));
        studentList.add(new Student(4L, "Mehmet", "Çelik", "+905555555555", "Ankara", "Sincan", "asdasdasd"));
        studentList.add(new Student(5L, "Eren", "Çelik", "+905555555555", "Ankara", "Sincan", "asdasdasd"));

        Mockito.when(studentService.getAll()).thenReturn(studentList);

        String url = "/api/students";

        mockMvc.perform(MockMvcRequestBuilders.get(url)).andExpect(MockMvcResultMatchers.status().isOk());

    }
}
