import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduSkillView } from './edu-skill-view';

describe('EduSkillView', () => {
  let component: EduSkillView;
  let fixture: ComponentFixture<EduSkillView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EduSkillView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EduSkillView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
