import { Component, inject } from '@angular/core';
import { SpinOptionsService } from '../../service/spin-options.service';
import { daysAvailableType, promptInterface } from '../../interface/environment.interface';
import { promptData } from '../../../environment/environment';

@Component({
  selector: 'app-writing-prompt-generator',
  imports: [],
  templateUrl: './writing-prompt-generator.component.html',
  styleUrl: './writing-prompt-generator.component.scss'
})
export class WritingPromptGeneratorComponent {
  public spinOptions = inject(SpinOptionsService);
  public randomPrompt: promptInterface | null = null;
  public displayPrompts: promptInterface[] = [];

  // We want to reset the animation every time we spin.
  private rollerKey = 0;
  get rollKey() {
    return this.rollerKey++;
  }

  public spin() {
    console.log('Spinning with options:', this.spinOptions.mode(), this.spinOptions.specifiedYear(), this.spinOptions.specifiedDate(), this.spinOptions.includeFree());
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
    console.log('Culled prompts:', culledPrompts);
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
    }
  }
}
