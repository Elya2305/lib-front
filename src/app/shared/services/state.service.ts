import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class StateService<T> {
  entity: T;

  store(entity: T): void {
    this.entity = entity;
  }

  clear(): void {
    this.entity = null;
  }

  get(): T {
    return this.entity;
  }
}
