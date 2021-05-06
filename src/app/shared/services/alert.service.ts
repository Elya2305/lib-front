import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  text: string;
  type: AlertType;
}

@Injectable({providedIn: 'root'})
export class AlertService {
  alert$: Subject<Alert> = new Subject<Alert>();

  success(text: string): void {
    console.log('SUCCESS');
    this.alert$.next({text, type: 'success'});
  }

  warning(text: string): void {
    this.alert$.next({text, type: 'warning'});
  }

  danger(text: string): void {
    this.alert$.next({text, type: 'danger'});
  }
}
