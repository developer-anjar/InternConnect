import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedInternships } from './applied-internships';

describe('AppliedInternships', () => {
  let component: AppliedInternships;
  let fixture: ComponentFixture<AppliedInternships>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppliedInternships]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppliedInternships);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
