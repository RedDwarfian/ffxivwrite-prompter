import { Component } from '@angular/core';
import { ConfigPanelComponent } from './component/config-panel/config-panel.component';
import { WritingPromptGeneratorComponent } from './component/writing-prompt-generator/writing-prompt-generator.component';

@Component({
  selector: 'app-root',
  imports: [ConfigPanelComponent, WritingPromptGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public currentYear = new Date().getFullYear();
}
