import { Pipe, PipeTransform } from '@angular/core';
import {log10} from "chart.js/helpers";

@Pipe({
  name: 'searchTable'
})
export class SearchTablePipe implements PipeTransform {
  
  transform(value: any, keys: string, term: string) {
    if (!term) {
      return value;
    }
    return (value || []).filter((item:any) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  }

}
