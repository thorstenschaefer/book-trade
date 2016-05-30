import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayConcat'
})
export class ArrayConcat implements PipeTransform {

  transform(array: any[], args?: any, nullString?: string, emptyString?: string): string {
    if (!array)
      return nullString ? nullString : '';
    if (array.length === 0)
      return emptyString ? emptyString : '';
    return array.reduce((a,b) => a + ", " + b);
  }

}
