package com.internConnect.service;

import com.internConnect.Dao.CompanyProfileRepository;
import com.internConnect.Entity.CompanyProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyProfileService {

    @Autowired
    private CompanyProfileRepository repository;

    public Optional<CompanyProfile> getByCompanyId(Long companyId) {
        return repository.findById(companyId);
    }

    public CompanyProfile saveOrUpdate(CompanyProfile profile) {
        // since companyId is PK, if exists it'll update, else create
        return repository.save(profile);
    }

    public boolean existsByCompanyId(Long companyId) {
        return repository.existsById(companyId);
    }
}
