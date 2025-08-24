import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingPromptGeneratorComponent } from './writing-prompt-generator.component';

describe('WritingPromptGeneratorComponent', () => {
  let component: WritingPromptGeneratorComponent;
  let fixture: ComponentFixture<WritingPromptGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingPromptGeneratorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WritingPromptGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
