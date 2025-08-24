import { Component, inject, ElementRef, viewChild, OnInit } from '@angular/core';
import { SpinOptionsService } from '../../service/spin-options.service';
import { daysAvailableType, promptInterface } from '../../interface/environment.interface';
import { promptData } from '../../../environment/environment';

@Component({
  selector: 'app-writing-prompt-generator',
  imports: [],
  templateUrl: './writing-prompt-generator.component.html',
  styleUrl: './writing-prompt-generator.component.scss'
})
export class WritingPromptGeneratorComponent implements OnInit {
  public spinOptions = inject(SpinOptionsService);
  public randomPrompt: promptInterface | null = null;
  public displayPrompts: promptInterface[] = [];
  public animating = false;
  private promptInfo = viewChild<ElementRef<HTMLParagraphElement>>('promptInfo');

  ngOnInit(): void {
    this.promptInfo()?.nativeElement.addEventListener('animationend', (ev) => {
      if (ev.animationName.endsWith('fadeInAnim')) {
        this.animationFinished();
      }
    });
  }

  animationFinished() {
    this.promptInfo()?.nativeElement.classList.remove('fadeIn');
    this.animating = false;
  }

  // We want to reset the animation every time we spin.
  private rollerKey = 0;
  get rollKey() {
    return this.rollerKey++;
  }

  public spin() {
    const culledPrompts: promptInterface[] = promptData.filter(p => {
      if (!this.spinOptions.includeFree() && p.isFree) {
        return false;
      }
      if (this.spinOptions.mode() === 'year' && p.year !== this.spinOptions.specifiedYear()) {
        return false;
      }
      if (this.spinOptions.mode() === 'date' && p.date !== this.spinOptions.specifiedDate()) {
        return false;
      }
      if (this.spinOptions.mode() === 'today') {
        this.spinOptions.todayDate.set(new Date().getDate() as daysAvailableType);
        if (p.date !== this.spinOptions.todayDate()) {
          return false;
        }
      }
      return true;
    });
    this.randomPrompt = null;
    this.displayPrompts = [];

    if (culledPrompts.length > 0) {
      let randomIndex = Math.floor(Math.random() * culledPrompts.length);
      this.randomPrompt = culledPrompts[randomIndex];

      // Add the prompts to the displayPrompts so we can animate them all flying by.
      while (this.displayPrompts.unshift(structuredClone(culledPrompts[randomIndex])) < 7) {
        randomIndex--;
        if (randomIndex < 0) {
          randomIndex += culledPrompts.length;
        }
      }

      // Set the promptInfo to fade in after the flying animation ends.
      this.promptInfo()?.nativeElement.classList.add('fadeIn');
      this.animating = true;
    }
  }
}
