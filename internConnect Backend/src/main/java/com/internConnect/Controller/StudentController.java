package com.internConnect.Controller;

import com.internConnect.Entity.Student;
import com.internConnect.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // REGISTER STUDENT
    @PostMapping("/signup")
    public ResponseEntity<?> registerStudent(@RequestBody Student student) {

        if (studentService.existsByEmail(student.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Email already registered.");
        }

        Student saved = studentService.saveOrUpdateStudent(student);

        Map<String, Object> response = new HashMap<>();
        response.put("studentId", saved.getStudentId());
        response.put("name", saved.getName());
        response.put("email", saved.getEmail());
        response.put("token", "dummy-token");


        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    // STUDENT LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student loginRequest) {

        Optional<Student> studentOpt =
                studentService.findByEmail(loginRequest.getEmail());

        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Email does not exist!");
        }

        Student student = studentOpt.get();

        if (!student.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Incorrect password!");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("studentId", student.getStudentId());
        response.put("name", student.getName());
        response.put("email", student.getEmail());

        return ResponseEntity.ok(response);
    }

}
