import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";

@Injectable({
	providedIn: 'root'
})
export class ValidationFormService {
	
	constructor() {
	}
	
	public number(control: FormControl): { [s: string]: boolean } | null {
		if (isNaN(+control.value) && control.value) {
			return {numberValidator: true}
		}
		return null
	}

	public persianString(control:FormControl): { [s: string]: boolean } | null {
		let regex = new RegExp('^[\u0600-\u06FF\\s]+$')
		if (control.value){
			let result = regex.test(control.value.toString());
			if (!result){
				return {persianString:true}
			}
		}
		return null
	}
	
	public length(control: FormControl): { [s: string]: boolean } | null {
		if (control.value && control.value.toString().trim().length < 3) {
			return {lengthValidator: true}
		}
		return null
	}
	
	public nationalCode(control: FormControl): { [s: string]: boolean } | null {
		if (control.value && control.value.toString().trim().length != 10) {
			return {nationalCodeValidator: true}
		}
		return null
	}
	
	public mobile(control: FormControl): { [s: string]: boolean } | null {
		var regex = new RegExp('^(\\+98|0|98)9(0[1-5]|[1 3]\\d|2[0-2]|98)\\d{7}$');
		
		if (control.value){
			var result = regex.test(control.value.toString());
			if (!result) {
				return {mobileValidator: true}
			}
		}
		return null
	}
	
	public phone(control: FormControl): { [s: string]: boolean } | null {
		var regex = new RegExp('^0[0-9]{2,}[0-9]{8}$');
		if (control.value){
			var result = regex.test(control.value.toString());
			if (!result) {
				return {phoneValidator: true}
			}
		}
		return null
	}
}
