package com.internConnect.service;

import com.internConnect.Dao.CompanyProfileRepository;
import com.internConnect.Dao.InternshipRepository;
import com.internConnect.Entity.CompanyProfile;
import com.internConnect.Entity.Internship;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InternshipService {

    @Autowired
    private InternshipRepository internshipRepo;

    @Autowired
    private CompanyProfileRepository companyProfileRepo;

    public Internship saveOrUpdate(Internship internship) {

        // 🔥 AUTO-FILL companyName from company_profile
        if (internship.getCompanyId() != null) {

            CompanyProfile companyProfile =
                    companyProfileRepo.findById(internship.getCompanyId())
                    .orElseThrow(() ->
                        new RuntimeException("Company profile not found for ID: "
                                + internship.getCompanyId())
                    );

            internship.setCompanyName(companyProfile.getCompanyName()); // ✅ FIX
        }

        return internshipRepo.save(internship);
    }

    public List<Internship> getByCompanyId(Long companyId) {
        return internshipRepo.findByCompanyId(companyId);
    }

    public Optional<Internship> getById(Long id) {
        return internshipRepo.findById(id);
    }

    public void deleteById(Long id) {
        internshipRepo.deleteById(id);
    }

    public List<Internship> getAll() {
        return internshipRepo.findAll();
    }
}
