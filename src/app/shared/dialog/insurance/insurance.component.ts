import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValidateService } from "../../../services/form-validate.service";
import { ValidationFormService } from "../../../services/validation-form.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RolesHttpService } from "../../../HttpServices/roles-http.service";
import { InsuranceService } from "../../../HttpServices/insurance.service";
import { SnackbarComponent } from "../../snackbar/snackbar.component";

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent {
  insurance_form:FormGroup;
  error = false;
  
  constructor(
      public validate: FormValidateService,
      private validator: ValidationFormService,
      public dialogRef: MatDialogRef<InsuranceComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _snackBar: MatSnackBar,
      private http:RolesHttpService
  ) {
    this.insurance_form = new FormGroup({
      title:new FormControl(null,[Validators.required,validator.string.bind(this)]),
      complete_day:new FormControl(null,[Validators.required, Validators.max(31), Validators.min(0)]),
      allowed_delay:new FormControl(null,[Validators.required, Validators.max(31), Validators.min(0)]),
      all_share:new FormControl(null,[Validators.required, Validators.max(100), Validators.min(0)]),
      admin_share:new FormControl(null,[Validators.required, Validators.max(100), Validators.min(0)]),
      user_share:new FormControl(null,[Validators.required, Validators.max(100), Validators.min(0)]),
      description:new FormControl(null,[Validators.required]),
/*      monthly_salary:new FormControl(null,[]),
      monthly_advantages:new FormControl(null,[]),*/
    })
  }
  
  onSubmit(){
    this.insurance_form.value.part = this.data.part
    this.http.createInsurance(this.insurance_form.value).subscribe({
      next:(data)=>{
        this.dialogRef.close({created: true})
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: `${this.insurance_form.value.title} با موفقیت ثبت شد`,
          duration: 1500
        })
      },
      error:(err)=>{
        this.insurance_form.get('title')?.setErrors({'duplicate': true})
        this.error = true
        console.log(err)
      },
    })
  }
  
  rmSalaryValidator(){
    this.insurance_form.get('monthly_salary')?.setValidators([])
    this.insurance_form.get('monthly_salary')?.updateValueAndValidity()
  }
  addSalaryValidator(){
    this.insurance_form.get('monthly_salary')?.setValidators([Validators.required,this.validator.number.bind(this), Validators.min(0)])
    this.insurance_form.get('monthly_salary')?.updateValueAndValidity()
  }
  rmAdvantagesValidator(){
    this.insurance_form.get('monthly_advantages')?.setValidators([])
    this.insurance_form.get('monthly_advantages')?.updateValueAndValidity()
  }
  addAdvantagesValidator(){
    this.insurance_form.get('monthly_advantages')?.setValidators([Validators.required,this.validator.number.bind(this), Validators.min(0)])
    this.insurance_form.get('monthly_advantages')?.updateValueAndValidity()
  }
}
