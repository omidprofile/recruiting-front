import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNumbers'
})
export class PersianNumberPipe implements PipeTransform {
  transform(value: string): string
  {
    let str = value.toString();
    str = str.replace(/0/g, '۰');
    str = str.replace(/1/g, '۱');
    str = str.replace(/2/g, '۲');
    str = str.replace(/3/g, '۳');
    str = str.replace(/4/g, '۴');
    str = str.replace(/5/g, '۵');
    str = str.replace(/6/g, '۶');
    str = str.replace(/7/g, '۷');
    str = str.replace(/8/g, '۸');
    str = str.replace(/9/g, '۹');
    return str;
  }
  
}
