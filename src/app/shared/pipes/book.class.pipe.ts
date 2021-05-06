import {Pipe, PipeTransform} from '@angular/core';
import {ClassificationDto} from '../dto/book';

@Pipe({name: 'class'})
export class BookClassPipe implements PipeTransform {
  transform(classification: ClassificationDto[], classType: string): string {
    if (classification) {
      const cls = classification.filter(c => c.type === classType).find(o => o.title);
      return cls ? '  ' +  cls.title : '  unknown';
    }
    return '  unknown';
  }
}
