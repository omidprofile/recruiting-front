import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'englishNumber'
})
export class EnglishNumberPipe implements PipeTransform {
  
  transform(value: string): string
  {
    let str = value.toString();
    str = str.replace(/۰/g, '0');
    str = str.replace(/۱/g, '1');
    str = str.replace(/۲/g, '2');
    str = str.replace(/۳/g, '3');
    str = str.replace(/۴/g, '4');
    str = str.replace(/۵/g, '5');
    str = str.replace(/۶/g, '6');
    str = str.replace(/۷/g, '7');
    str = str.replace(/۸/g, '8');
    str = str.replace(/۹/g, '9');
    return str;
  }

}
