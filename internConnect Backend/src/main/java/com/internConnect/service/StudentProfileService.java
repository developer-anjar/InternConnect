package com.internConnect.service;

import com.internConnect.Dao.StudentProfileRepository;
import com.internConnect.Entity.StudentProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentProfileService {

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    // Create or Update profile
    public StudentProfile saveOrUpdateProfile(StudentProfile profile) {
        return studentProfileRepository.save(profile);
    }

    // Get profile by studentId
    public StudentProfile getProfileByStudentId(Long studentId) {
        return studentProfileRepository.findById(studentId).orElse(null);
    }
}
