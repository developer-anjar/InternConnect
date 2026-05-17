import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { LoginCompany } from './auth/login-company/login-company';
import { SignupCompany } from './auth/signup-company/signup-company';
import { SignupStudent } from './auth/signup-student/signup-student';

import { Dashboard } from './company/dashboard/dashboard';
import { AddInternships } from './company/dashboard/add-internships/add-internships';
import { ManageInternships } from './company/dashboard/manage-internships/manage-internships';
import { Applications } from './company/dashboard/applications/applications';
import { Profile } from './company/dashboard/profile/profile';
import { ProfileForm } from './company/profile-form/profile-form';

import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { About } from './shared/about/about';
import { Contact } from './shared/contact/contact';
import { Support } from './shared/support/support';

import { Home } from './student/home/home';
import { StudentDashboard } from './student/student-dashboard/student-dashboard';
import { StudentProfile } from './student/student-dashboard/student-profile/student-profile';
import { MyApplication } from './student/student-dashboard/my-application/my-application';

import { StudentProfileForm } from './student/student-profile-form/student-profile-form';
import { InternshipDetails } from './student/internship-details/internship-details';
import { EduSkillView } from './student/student-dashboard/edu-skill-view/edu-skill-view';
import { ProjectResumeView } from './student/student-dashboard/project-resume-view/project-resume-view';
import { InternshipList } from './student/student-dashboard/internship-list/internship-list';
import { EducationForm } from './student/education-form/education-form';
import { SkillsForm } from './student/skills-form/skills-form';
import { ProjectsForm } from './student/projects-form/projects-form';
import { ResumeForm } from './student/resume-form/resume-form';
import { AiInternshipRecommender } from './student/ai-internship-recommender/ai-internship-recommender';
import { AiResumeGenerator } from './student/ai-resume-generator/ai-resume-generator';
import { AiChatbot } from './student/ai-chatbot/ai-chatbot';

import { authGuard } from './core/guards/auth-guard';
import { studentGuard } from './core/guards/student-guard-guard';
import { companyGuard } from './core/guards/company-guard-guard';

export const routes: Routes = [
    {path:'', component:Home},  
    {path:'home', component:Home},
    {path:'navbar', component:Navbar ,},
    {path:'footer',component:Footer},
    {path:'about', component:About ,},
    {path:'contact', component:Contact},
    {path:'support', component:Support},
    {path:'internship-details/:id', component:InternshipDetails , canActivate:[studentGuard]},


    {path:'login', component:Login },
    {path:'login-company', component:LoginCompany},
    {path:'signup-company', component:SignupCompany},
    {path:'signup-student', component:SignupStudent},

    {path:'company-profile-form', component:ProfileForm},
    {
        path:'dashboard',
        component:Dashboard,
        canActivate:[companyGuard],
        children:[
            {path:'profile', component:Profile},
            {path:'add-internship', component:AddInternships},
            {path:'manage-internship', component:ManageInternships},
            {path:'applications', component:Applications},

            {path:'', redirectTo:'profile', pathMatch:'full'}
        ]          
    },
    

    {path:'student-dashboard',
      component:StudentDashboard,
      canActivate:[authGuard, studentGuard],
      children:[
        {path:'student-profile', component:StudentProfile},
        {path:'my-applications', component:MyApplication},
        {path:'education-skills', component:EduSkillView},
        {path:'project-resume', component:ProjectResumeView},
        {path:'internship-list', component:InternshipList},
        {path:'education-form', component:EducationForm},
        {path:'skills-form', component:SkillsForm},
        {path:'projects-form', component:ProjectsForm},
        {path:'resume-form', component:ResumeForm},
        {path:'ai-recommender', component:AiInternshipRecommender},
        {path:'ai-resume-generator', component:AiResumeGenerator},
        {path:'ai-chatbot', component:AiChatbot},

        {path:'', redirectTo:'student-profile', pathMatch:'full'}
      ]
    },
    {path:'student-profile-form', component:StudentProfileForm, canActivate:[studentGuard]},
    {
  path: 'company/internships',
  component: InternshipList
},
{
  path: 'company/internship/new',
  component: AddInternships
},
{
  path: 'company/internship/edit/:id',
  component: AddInternships
}

    

    
];
