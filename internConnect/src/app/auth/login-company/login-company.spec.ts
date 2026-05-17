import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCompany } from './login-company';

describe('LoginCompany', () => {
  let component: LoginCompany;
  let fixture: ComponentFixture<LoginCompany>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCompany]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCompany);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
