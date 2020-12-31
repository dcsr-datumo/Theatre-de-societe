import { Pipe, PipeTransform } from '@angular/core';

/**
 * convert knora xml standof to html
 * @param xml
 */

 @Pipe({
  name: 'convertStandof'
})
export class ConvertStandofPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value) {
      // strip out the '<xml...' part
      let matches = value.match('<text>.*');
      if (matches && matches.length > 0) {
        return matches[0];
      }
    }
    return "";
  }
}
