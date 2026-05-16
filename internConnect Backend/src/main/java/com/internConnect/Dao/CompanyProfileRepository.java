package com.internConnect.Dao;

import com.internConnect.Entity.CompanyProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, Long> {
    // JpaRepository already gives findById, save, existsById etc.
}
