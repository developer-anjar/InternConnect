import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInternships } from './manage-internships';

describe('ManageInternships', () => {
  let component: ManageInternships;
  let fixture: ComponentFixture<ManageInternships>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInternships]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInternships);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
