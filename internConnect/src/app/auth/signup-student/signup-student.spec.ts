import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStudent } from './signup-student';

describe('SignupStudent', () => {
  let component: SignupStudent;
  let fixture: ComponentFixture<SignupStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
