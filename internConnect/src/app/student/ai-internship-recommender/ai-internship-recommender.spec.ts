import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiInternshipRecommender } from './ai-internship-recommender';

describe('AiInternshipRecommender', () => {
  let component: AiInternshipRecommender;
  let fixture: ComponentFixture<AiInternshipRecommender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiInternshipRecommender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiInternshipRecommender);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});