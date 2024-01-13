import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { DateService } from "./date.service";
import { EnglishNumberPipe } from "../shared/pipe/english-number.pipe";

@Injectable({
	providedIn: 'root'
})
export class ValidationFormService {
	
	
	public number(control: FormControl): { [s: string]: boolean } | null {
		if (isNaN(+control.value) && control.value) {
			return {numberValidator: true}
		}
		return null
	}

	public currency(control: FormControl): { [s: string]: boolean } | null {
		if (control.value){
			let val = control.value.replace(/[\u0660-\u0669\u06f0-\u06f9]/g,    // Detect all Persian/Arabic Digit in range of their Unicode with a global RegEx character set
				function(a:any) {
					return a.charCodeAt(0) & 0xf;
				})
			val = val.replaceAll(',','')
			if (isNaN(val) && val) {
				return {currency: true}
			}
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

	public englishString(control:FormControl): { [s: string]: boolean } | null {
		let regex = new RegExp('^[A-Za-z][A-Za-z]*$')
		if (control.value){
			let result = regex.test(control.value.toString());
			if (!result){
				return {englishString:true}
			}
		}
		return null
	}

	public string(control:FormControl): { [s: string]: boolean } | null {
		if (typeof control.value != 'string'){
				return {string:true}
		}
		return null
	}
	
	public length(control: FormControl): { [s: string]: boolean } | null {
		if (control.value && control.value.toString().trim().length < 2) {
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
