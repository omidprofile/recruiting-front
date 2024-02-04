import { Pipe, PipeTransform } from '@angular/core';
import { EnglishNumberPipe } from "./english-number.pipe";

@Pipe({
  name: 'persianpurrencypipe'
})
export class PersianCurrencyPipe implements PipeTransform {
  constructor(private toEN:EnglishNumberPipe) {
  }
  transform(value: string): string
  {
    if(!value && value != '0')
      return '';
    
    let str = Number(this.toEN.transform(value.toString()).replace(/[a-zA-Z,]/g,'')).toLocaleString();
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
