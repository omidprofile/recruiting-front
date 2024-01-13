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

  englishString(field:any){
    return !!field.hasError('englishString');
  }

  lengthCheck(field:any){
    return !!field.hasError('lengthValidator');
  }

  isNumber(field:any){
    return !!field.hasError('numberValidator');
  }
  
  isMax(field:any){
    return !!field.hasError('max');
  }
  
  isMin(field:any){
    return !!field.hasError('min');
  }
  
  isValidMobile(field:any){
    return !!field.hasError('mobileValidator');
  }
  
  isPhoneValid(field:any){
    return !!field.hasError('phoneValidator');
  }
  
  isNationalCodeValidator(field:any){
    return !!field.hasError('nationalCodeValidator');
  }
  
  isEmailValid(field:any){
    return !! field.hasError('email')
  }

  isDuplicate(field:any){
    return !! field.hasError('duplicate')
  }

  isString(field:any){
    return !! field.hasError('string')
  }
  isCurrency(field:any){
    return !! field.hasError('currency')
  }
  
  notEmptyValidate(field:any, title:string){
    if(this.requiredCheck(field))
      return `${title} وارد شود`
    return null
  }

  stringValidate(field:any, title:string){
     if(this.requiredCheck(field))
       return `${title} وارد شود`;
     if(this.isString(field))
       return `فرمت وارد شده صحیح نمی باشد`;
    if (this.lengthCheck(field))
      return `طول ${title} وارد شده کمتر از حد مجاز است`;
    if (this.persianString(field))
      return "از حروف فارسی استفاده نمایید";
    if (this.englishString(field))
      return "از حروف لاتین  استفاده نمایید";
    return null
  }

  requiredValidate(field:any, title:string){
    if (this.requiredCheck(field))
      return `${title} را انتخاب کنید`;
    return null;
  }

  nationalCodeValidate(field:any){
    if (this.requiredCheck(field))
      return "کدملی را وارد نمایید";
    if(this.isNumber(field))
      return "فرمت وارد شده صحیح نیست";
    if (this.isNationalCodeValidator(field)){
      return "کد ملی وارد شده اشتباه است";
    }
    if (this.isDuplicate(field))
      return ` قبلا ثبت شده است`;
    return null;
  }
  numberValidate(field:any, title:string){
    if (this.requiredCheck(field))
      return `${title}  را وارد نمایید`;
    if(this.isNumber(field))
      return "فرمت وارد شده صحیح نیست";
    if(this.isCurrency(field))
      return "فرمت وارد شده صحیح نیست";
    if(this.isMax(field))
      return 'مقدار وارد شده بیشتر از حد مجاز است';
    if (this.isMin(field))
      return 'مقدار وارد شده کمتر از حد مجاز است';
    if (this.isDuplicate(field))
      return `${title} قبلا ثبت شده است`;
    return null;
  }
  
  mobileValidate(field:any){
    if (this.requiredCheck(field))
      return "ورود شماره همراه الزامی است";
    if(this.isValidMobile(field))
      return "قالب وارد شده صحیح نمیباشد";
    if (this.isDuplicate(field))
      return `شماره ی تکراری وارد کرده اید`;
    return null;
  }
  
  phoneValidate(field:any){
    if (this.requiredCheck(field))
      return "ورود شماره ثابت الزامی است";
    if(this.isPhoneValid(field))
      return "قالب وارد شده صحیح نمیباشد";
    if (this.isDuplicate(field))
      return `شماره ی تکراری وارد کرده اید`;
    return null;
  }
  
  emailValidate(field:any){
    if (this.requiredCheck(field))
      return "ورود ایمیل  الزامی است";
    if(this.isEmailValid(field))
      return "قالب وارد شده صحیح نمیباشد";
    if (this.isDuplicate(field))
      return ` ایمیل قبلا ثبت شده است`;
    return null;
  }
  
  plaqueValidate(field:any){
    if (this.requiredCheck(field))
      return "پلاک وارد شود";
    if (this.isNumber(field))
      return "قالب وارد شده صحیح نمیباشد";
    return null;
  }
  
  postalCodeValidate(field:any){
    if (this.requiredCheck(field))
      return "کدپستی وارد شود";
    if (this.isNumber(field))
      return "قالب وارد شده صحیح نمیباشد";
    if (this.isNationalCodeValidator(field))
      return "قالب وارد شده صحیح نمیباشد";
    if (this.isDuplicate(field))
      return `این کدپستی قبلا ثبت شده است`;
    return null;
  }
  
  
  

}
