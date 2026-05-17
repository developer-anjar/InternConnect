import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectResumeView } from './project-resume-view';

describe('ProjectResumeView', () => {
  let component: ProjectResumeView;
  let fixture: ComponentFixture<ProjectResumeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectResumeView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectResumeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
