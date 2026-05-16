package com.internConnect.service;

import com.internConnect.Dao.CompanyRepository;
import com.internConnect.Entity.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository repo;

    public Company save(Company c) { return repo.save(c); }

    public Optional<Company> findByEmail(String email) { return repo.findByEmail(email); }

    public Optional<Company> findById(Long id) { return repo.findById(id); }
}
