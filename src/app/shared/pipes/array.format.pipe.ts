import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'formatArray'})
export class ArrayFormatPipe implements PipeTransform {
  transform(arr: string[], title = ''): any {
    if (!arr) return '';
    if (title) {
      return `${title}: ${arr.join(', ')}`;
    } else {
      return arr.join(', ');
    }
  }
}
