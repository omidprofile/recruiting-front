import { Pipe, PipeTransform } from '@angular/core';
import { EnglishNumberPipe } from "./english-number.pipe";

@Pipe({
	name: 'persianpurrencypipe'
})
export class PersianCurrencyPipe implements PipeTransform {
	constructor(private toEN: EnglishNumberPipe) {
	}
	
	transform(value: string): string {
		if (!value && value != '0')
			return '';
		value = this.toEN.transform(value.toString()).replace(/[a-zA-Z,]/g, '')
		let temp = value.split('.')
		value = temp[0];
		let temp2 = []
		let j = 1;
		for (let i = value.length; i >= 0; i--) {
			if (value[i] != undefined){
              if (j - 1 != 0 && (j-1) % 3 == 0)
                temp2.unshift(',')
              temp2.unshift(value[i])
              j++;
            }

        }
		let str = temp[1] ? temp2.join('') + '.' + temp[1] : temp2.join('');
		// let str = Number(this.toEN.transform(value.toString()).replace(/[a-zA-Z]/g, '')).toString();
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
