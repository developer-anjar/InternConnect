package com.internConnect.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "internship")
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long internshipId;

    // ================= COMPANY =================
    private Long companyId;

    private String companyName;

    private String companyWebsite;

    private String companyLocation;

    private String industryDomain;

    @Column(columnDefinition = "TEXT")
    private String aboutCompany;


    // ================= INTERNSHIP =================

    private String internshipTitle;

    private String department;

    private String internshipType;     // REMOTE / ONSITE / HYBRID

    private Integer duration;          // Months

    private LocalDate startDate;

    private String workingHours;       // FULL_TIME / PART_TIME


    // ================= ROLE =================

    @Column(columnDefinition = "TEXT")
    private String jobDescription;

    @Column(columnDefinition = "TEXT")
    private String dailyTasks;

    private String toolsUsed;

    private String projects;


    // ================= ELIGIBILITY =================

    @Column(columnDefinition = "TEXT")
    private String skills;

    private String qualification;

    private String year;

    private String experience;

    private String language;


    // ================= BENEFITS =================

    private Integer stipend;

    private String paymentMode;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean certificate;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean lor;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean ppo;

    @Column(columnDefinition = "TEXT")
    private String benefits;


    // ================= APPLICATION =================

    private Integer openings;

    private LocalDate lastDate;

    private String applyLink;

    @Column(columnDefinition = "TEXT")
    private String process;

    private String hrEmail;


    // ================= EXTRA =================

    private String level;

    public Long getInternshipId() {
		return internshipId;
	}


	public void setInternshipId(Long internshipId) {
		this.internshipId = internshipId;
	}


	public Long getCompanyId() {
		return companyId;
	}


	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}


	public String getCompanyName() {
		return companyName;
	}


	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}


	public String getCompanyWebsite() {
		return companyWebsite;
	}


	public void setCompanyWebsite(String companyWebsite) {
		this.companyWebsite = companyWebsite;
	}


	public String getCompanyLocation() {
		return companyLocation;
	}


	public void setCompanyLocation(String companyLocation) {
		this.companyLocation = companyLocation;
	}


	public String getIndustryDomain() {
		return industryDomain;
	}


	public void setIndustryDomain(String industryDomain) {
		this.industryDomain = industryDomain;
	}


	public String getAboutCompany() {
		return aboutCompany;
	}


	public void setAboutCompany(String aboutCompany) {
		this.aboutCompany = aboutCompany;
	}


	public String getInternshipTitle() {
		return internshipTitle;
	}


	public void setInternshipTitle(String internshipTitle) {
		this.internshipTitle = internshipTitle;
	}


	public String getDepartment() {
		return department;
	}


	public void setDepartment(String department) {
		this.department = department;
	}


	public String getInternshipType() {
		return internshipType;
	}


	public void setInternshipType(String internshipType) {
		this.internshipType = internshipType;
	}


	public Integer getDuration() {
		return duration;
	}


	public void setDuration(Integer duration) {
		this.duration = duration;
	}


	public LocalDate getStartDate() {
		return startDate;
	}


	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}


	public String getWorkingHours() {
		return workingHours;
	}


	public void setWorkingHours(String workingHours) {
		this.workingHours = workingHours;
	}


	public String getJobDescription() {
		return jobDescription;
	}


	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}


	public String getDailyTasks() {
		return dailyTasks;
	}


	public void setDailyTasks(String dailyTasks) {
		this.dailyTasks = dailyTasks;
	}


	public String getToolsUsed() {
		return toolsUsed;
	}


	public void setToolsUsed(String toolsUsed) {
		this.toolsUsed = toolsUsed;
	}


	public String getProjects() {
		return projects;
	}


	public void setProjects(String projects) {
		this.projects = projects;
	}


	public String getSkills() {
		return skills;
	}


	public void setSkills(String skills) {
		this.skills = skills;
	}


	public String getQualification() {
		return qualification;
	}


	public void setQualification(String qualification) {
		this.qualification = qualification;
	}


	public String getYear() {
		return year;
	}


	public void setYear(String year) {
		this.year = year;
	}


	public String getExperience() {
		return experience;
	}


	public void setExperience(String experience) {
		this.experience = experience;
	}


	public String getLanguage() {
		return language;
	}


	public void setLanguage(String language) {
		this.language = language;
	}


	public Integer getStipend() {
		return stipend;
	}


	public void setStipend(Integer stipend) {
		this.stipend = stipend;
	}


	public String getPaymentMode() {
		return paymentMode;
	}


	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}


	public Boolean getCertificate() {
		return certificate;
	}


	public void setCertificate(Boolean certificate) {
		this.certificate = certificate;
	}


	public Boolean getLor() {
		return lor;
	}


	public void setLor(Boolean lor) {
		this.lor = lor;
	}


	public Boolean getPpo() {
		return ppo;
	}


	public void setPpo(Boolean ppo) {
		this.ppo = ppo;
	}


	public String getBenefits() {
		return benefits;
	}


	public void setBenefits(String benefits) {
		this.benefits = benefits;
	}


	public Integer getOpenings() {
		return openings;
	}


	public void setOpenings(Integer openings) {
		this.openings = openings;
	}


	public LocalDate getLastDate() {
		return lastDate;
	}


	public void setLastDate(LocalDate lastDate) {
		this.lastDate = lastDate;
	}


	public String getApplyLink() {
		return applyLink;
	}


	public void setApplyLink(String applyLink) {
		this.applyLink = applyLink;
	}


	public String getProcess() {
		return process;
	}


	public void setProcess(String process) {
		this.process = process;
	}


	public String getHrEmail() {
		return hrEmail;
	}


	public void setHrEmail(String hrEmail) {
		this.hrEmail = hrEmail;
	}


	public String getLevel() {
		return level;
	}


	public void setLevel(String level) {
		this.level = level;
	}


	public String getTags() {
		return tags;
	}


	public void setTags(String tags) {
		this.tags = tags;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public LocalDateTime getPostedAt() {
		return postedAt;
	}


	public void setPostedAt(LocalDateTime postedAt) {
		this.postedAt = postedAt;
	}


	private String tags;


    // ================= SYSTEM =================

    private String status;

    private LocalDateTime postedAt;


    // ================= CONSTRUCTOR =================

    public Internship() {

        this.status = "ACTIVE";

        this.postedAt = LocalDateTime.now();

        this.certificate = false;

        this.lor = false;

        this.ppo = false;
    }

    // ================= GETTERS & SETTERS =================

    // (All getters and setters remain exactly same)
}