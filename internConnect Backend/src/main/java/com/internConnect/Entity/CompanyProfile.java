package com.internConnect.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "company_profile")
public class CompanyProfile {

    @Id
    private Long companyId; // primary key (provided by Company.id)

    private String companyName;
    private String email;
    private String phone;
    private String location;
    private String establishedYear;
    private String description;
    private String companySize;

    // Constructors
    public CompanyProfile() {}

    public CompanyProfile(Long companyId, String companyName, String email, String phone,
                          String location, String establishedYear, String description, String companySize) {
        this.companyId = companyId;
        this.companyName = companyName;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.establishedYear = establishedYear;
        this.description = description;
        this.companySize = companySize;
    }

    // Getters and setters
    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getEstablishedYear() { return establishedYear; }
    public void setEstablishedYear(String establishedYear) { this.establishedYear = establishedYear; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCompanySize() { return companySize; }
    public void setCompanySize(String companySize) { this.companySize = companySize; }
}
