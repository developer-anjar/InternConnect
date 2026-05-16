package com.internConnect.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId; // primary key requested by you

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password; // beginner: plain text. Not for production.

    public Company() {}

    public Company(Long companyId, String name, String email, String password) {
        this.companyId = companyId;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
