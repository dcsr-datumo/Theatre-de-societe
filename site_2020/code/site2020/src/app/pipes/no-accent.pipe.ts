import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noAccent'
})
export class NoAccentPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace('è', 'e');
  }
}
