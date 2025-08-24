import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  yearsAvailable,
  yearsAvailableType,
  daysAvailableType,
  daysAvailable,
} from '../interface/environment.interface';

export const spinMode = ['today', 'year', 'date', 'all'];
export type spinModeType = (typeof spinMode)[number];
export type spinLabel = { [key in spinModeType]: string };
export const spinLabels: spinLabel = {
  today: "Today's Date",
  year: 'Specific Year',
  date: 'Specific Date',
  all: 'All Prompts',
};

@Injectable({
  providedIn: 'root',
})
export class SpinOptionsService {
  mode: WritableSignal<spinModeType> = signal('today');
  yearsAvailable = yearsAvailable;
  datesAvailable = daysAvailable;
  specifiedYear: WritableSignal<yearsAvailableType> = signal(
    this.yearsAvailable[this.yearsAvailable.length - 1]
  );
  specifiedDate: WritableSignal<daysAvailableType> = signal(
    new Date().getDate() as daysAvailableType
  );
  includeFree: WritableSignal<boolean> = signal(true);
  todayDate: WritableSignal<daysAvailableType> = signal(
    new Date().getDate() as daysAvailableType
  );
}
