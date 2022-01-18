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
      // transform http://rdfh.ch/0103/cRNeWGjpTo-193MHt0F19w
      // into:     http://ark.dasch.swiss/ark:/72163/1/0103/cRNeWGjpTo-193MHt0F19w
      //           http://ark.dasch.swiss/ark:/72163/1/0103/zYucAQWeR2=hxo2Te4kE0Af.20211026T123043634248Z
      // http://ark.dasch.swiss/ark:/72163/1/0103/zYucAQWeR2=hxo2Te4kE0Af
      //                      http://rdfh.ch/0103/zYucAQWeR2-hxo2Te4kE0A
      // http://ark.dasch.swiss/ark:/72163/1/0103/zYucAQWeR2=hxo2Te4kE0Af
      // or http interceptors?
    }
    return "";
  }
}
