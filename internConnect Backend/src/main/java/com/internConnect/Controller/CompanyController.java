package com.internConnect.Controller;

import com.internConnect.Entity.Company;
import com.internConnect.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/company")
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // Signup: returns company object including generated companyId
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Company company) {
        if (company.getEmail() == null || company.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error","Email and password required"));
        }
        if (companyService.findByEmail(company.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error","Email already registered"));
        }
        Company saved = companyService.save(company);
        Map<String, Object> resp = new HashMap<>();
        resp.put("companyId", saved.getCompanyId());
        resp.put("companyName", saved.getName());
        resp.put("email", saved.getEmail());
        resp.put("token", "dummy-token"); // beginner: placeholder token
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    // Login: returns companyId on success
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Company request) {
        Optional<Company> opt = companyService.findByEmail(request.getEmail());
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Email not found"));
        }
        Company c = opt.get();
        if (!c.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Incorrect password"));
        }
        Map<String,Object> resp = new HashMap<>();
        resp.put("companyId", c.getCompanyId());
        resp.put("companyName", c.getName());
        resp.put("email", c.getEmail());
        resp.put("token", "dummy-token");
        return ResponseEntity.ok(resp);
    }
}
