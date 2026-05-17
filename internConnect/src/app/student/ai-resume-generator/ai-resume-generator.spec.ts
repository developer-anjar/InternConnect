import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiResumeGenerator } from './ai-resume-generator';

describe('AiResumeGenerator', () => {
  let component: AiResumeGenerator;
  let fixture: ComponentFixture<AiResumeGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiResumeGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiResumeGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});