import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Work } from '../models/work.model';

@Pipe({
  name: 'filterWorkTitle'
})
export class FilterWorkTitlePipe implements PipeTransform {

  transform(works: Observable<Work[]>, title: string): Observable<Work[]> {
    if (!works) { return works; }
    if (!title) { return works; }

    title = title.toLowerCase();

    // return works.pipe(
    //   map( work => {
    //     filter( work: Work => {
    //       return work.title.toLowerCase().includes(title);
    //     })
    //   })
    // );
  }
}
