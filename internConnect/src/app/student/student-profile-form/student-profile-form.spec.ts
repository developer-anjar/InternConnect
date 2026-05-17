import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileForm } from './student-profile-form';

describe('StudentProfileForm', () => {
  let component: StudentProfileForm;
  let fixture: ComponentFixture<StudentProfileForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfileForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfileForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
