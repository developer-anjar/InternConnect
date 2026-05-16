package com.internConnect.service;

import com.internConnect.Entity.Resume;
import com.internConnect.Entity.Student;
import com.internConnect.Dao.ResumeRepository;
import com.internConnect.Dao.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private StudentRepository studentRepository;

    private final String uploadDir = "uploads/";

    public Resume uploadResume(Long studentId, MultipartFile file) throws IOException {

    if (file == null || file.isEmpty()) {
        throw new RuntimeException("File is empty");
    }

    Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    // ✅ Absolute path (IMPORTANT)
    String uploadDir = "C:/uploads/";

    File dir = new File(uploadDir);
    if (!dir.exists()) {
        dir.mkdirs();
    }

    String fileName = studentId + "_" + file.getOriginalFilename();
    String filePath = uploadDir + fileName;

    file.transferTo(new File(filePath));

    Resume resume = resumeRepository.findByStudentStudentId(studentId)
            .orElse(new Resume());

    resume.setStudent(student);
    resume.setFileUrl("uploads/" + fileName); // for URL access

    return resumeRepository.save(resume);
}

    public Resume getResume(Long studentId) {
        return resumeRepository.findByStudentStudentId(studentId).orElse(null);
    }
}