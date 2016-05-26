import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class Shorten implements PipeTransform {

  transform(value: string, characters: number): string {
    if (!value || value.length < characters)
      return value;
    let shortened = value.substr(0, characters);
    let lastSentenceEnding = shortened.lastIndexOf('.');
    if (lastSentenceEnding >= 0) {
      shortened = shortened.substr(0, lastSentenceEnding + 1);
      // shortened = shortened + " ...";
    }
    return shortened;
  }

}
