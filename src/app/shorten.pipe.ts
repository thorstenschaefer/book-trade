import { Pipe, PipeTransform } from '@angular/core';

/** 
 * Pipe that shortens longer paragraphs to a maximum length.
 * The pipe tries to select the first n sentences (separated by a dot)
 * that together fits the specified maximum number of characters.
 * If no sentence can be found within the limit of characters, we just
 * cut the string to it's maximum number of characters allowed. 
 */
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
    }
    return shortened;
  }

}
