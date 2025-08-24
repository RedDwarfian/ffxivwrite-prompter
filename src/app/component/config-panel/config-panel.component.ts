import { Component, inject } from '@angular/core';
import {
  spinMode,
  spinLabels,
  SpinOptionsService,
} from '../../service/spin-options.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-config-panel',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './config-panel.component.html',
  styleUrl: './config-panel.component.scss',
})
export class ConfigPanelComponent {
  public spinLabels = spinLabels;
  public spinMode = spinMode;
  public spinOptions = inject(SpinOptionsService);
}
