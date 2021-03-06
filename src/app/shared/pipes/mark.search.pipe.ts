import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'mark'})
export class MarkSearchPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    const re = new RegExp(args, 'gi');
    return value.replace(re, '<mark>$&</mark>');
  }
}
