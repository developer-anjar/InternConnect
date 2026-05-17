import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInternships } from './add-internships';

describe('AddInternships', () => {
  let component: AddInternships;
  let fixture: ComponentFixture<AddInternships>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInternships]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInternships);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
