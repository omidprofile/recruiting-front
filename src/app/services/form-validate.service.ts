import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormValidateService {

  constructor() { }

  requiredCheck(field:any){
    return !!field.hasError('required');
  }

  persianString(field:any){
    return !!field.hasError('persianString');
  }

  lengthCheck(field:any){
    return !!field.hasError('lengthValidator');
  }

  isNumber(field:any){
    return !!field.hasError('numberValidator');
  }
  
  isValidMobile(field:any){
    return !!field.hasError('mobileValidator');
  }
  
  isPhoneValid(field:any){
    return !!field.hasError('phoneValidator');
  }
  
  isNationalCodeValidatorValid(field:any){
    return !!field.hasError('nationalCodeValidator');
  }
  
  isEmailValid(field:any){
    return !! field.hasError('email')
  }
  
  notEmptyValidate(field:any, title:string){
    if(this.requiredCheck(field))
      return `${title} وارد شود`
    return null
  }

  stringValidate(field:any, title:string){
     if(this.requiredCheck(field))
       return `${title} وارد شود`
    if (this.lengthCheck(field))
      return `طول ${title} وارد شده کمتر از حد مجاز است`
    if (this.persianString(field))
      return "از کلمات فارسی استفاده نمایید"
    return null
  }

  requiredValidate(field:any, title:string){
    if (this.requiredCheck(field))
      return `${title} را انتخاب کنید`
    return null;
  }

  nationalCodeValidate(field:any){
    if (this.requiredCheck(field))
      return "کدملی را وارد نمایید";
    if(this.isNumber(field))
      return "فرمت وارد شده صحیح نیست"
    if (this.isNationalCodeValidatorValid(field)){
      return "کد ملی وارد شده اشتباه است"
    }
    return null;
  }
  numberValidate(field:any, title:string){
    if (this.requiredCheck(field))
      return `${title}  را وارد نمایید`;
    if(this.isNumber(field))
      return "فرمت وارد شده صحیح نیست"
    return null;
  }
  
  mobileValidate(field:any){
    if (this.requiredCheck(field))
      return "ورود شماره همراه الزامی است"
    if(this.isValidMobile(field))
      return "قالب وارد شده صحیح نمیباشد"
    return null;
  }
  
  phoneValidate(field:any){
    if (this.requiredCheck(field))
      return "ورود شماره ثابت الزامی است"
    if(this.isPhoneValid(field))
      return "قالب وارد شده صحیح نمیباشد"
    return null;
  }
  
  emailValidate(field:any){
    if (this.requiredCheck(field))
      return "ورود ایمیل  الزامی است"
    if(this.isEmailValid(field))
      return "قالب وارد شده صحیح نمیباشد"
    return null;
  }
  
  plaqueValidate(field:any){
    if (this.requiredCheck(field))
      return "پلاک وارد شود"
    if (this.isNumber(field))
      return "قالب وارد شده صحیح نمیباشد"
    return null;
  }
  
  postalCodeValidate(field:any){
    if (this.requiredCheck(field))
      return "کدپستی وارد شود"
    if (this.isNumber(field))
      return "قالب وارد شده صحیح نمیباشد"
    if (this.numberValidate(field, 'کدپستی'))
      return "قالب وارد شده صحیح نمیباشد"
    
    return null;
  }
  
  
  

}
