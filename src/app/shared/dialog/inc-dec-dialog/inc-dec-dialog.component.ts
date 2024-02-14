import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValidateService } from "../../../services/form-validate.service";
import { ValidationFormService } from "../../../services/validation-form.service";
import { DateService } from "../../../services/date.service";
import { UsersHttpService } from "../../../HttpServices/users-http.service";
import { IncDecHttpService } from "../../../HttpServices/inc-dec-http.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PersianCurrencyPipe } from "../../pipe/persian-currency.pipe";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS
} from "../../../services/material.persian-date.adapter.service";

@Component({
  selector: 'app-inc-dec-dialog',
  templateUrl: './inc-dec-dialog.component.html',
  styleUrls: ['./inc-dec-dialog.component.scss'],
  providers: [PersianCurrencyPipe,
    {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},],
})
export class IncDecDialogComponent implements OnInit{
  form: FormGroup;
  filteredOptions: any[];
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  options: any;
  progress = true;
  user: any;
  
  
  constructor(public validate: FormValidateService,
              private validator: ValidationFormService,
              private date: DateService,
              private http: UsersHttpService,
              private IncDecHttp:IncDecHttpService,
              public dialogRef: MatDialogRef<IncDecDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _snackBar: MatSnackBar,
              private pcp:PersianCurrencyPipe
  ) {
    this.form = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      user: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required, validator.string.bind(this)]),
      price: new FormControl(null, [Validators.required, validator.currency.bind(this)]),
      date: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required, validator.string.bind(this)]),
      apply: new FormControl(null, [Validators.required]),
    })
  }
  
  ngOnInit() {
    this.getUsers();
    if(this.data){
      this.form.get('type')?.setValue(this.data.en_type)
      this.form.get('user')?.setValue(this.data.user)
      this.form.get('title')?.setValue(this.data.title)
      this.form.get('price')?.setValue(this.pcp.transform(this.data.price))
      this.form.get('date')?.setValue(new Date(this.data.unix))
      this.form.get('description')?.setValue(this.data.description)
      this.form.get('apply')?.setValue(this.data.en_apply)
    }
  }
  
  getUsers() {
    this.http.getJob().subscribe((data: any) => {
      this.options = []
      for (let item of data) {
        let person: any = {}
        person.name = item.user_id.name + " " + item.user_id.last_name;
        person.code = item.personal_code;
        person.id = item._id;
        person.part = item?.part_info.title;
        person.rank = item?.rank_info.title;
        this.options.push(person)
      }
      this.filteredOptions = this.options.slice();
      this.progress = false;
    })
  }
  
  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter((o: any) => o.name.toLowerCase().includes(filterValue));
  }
  
  setUser(id: any) {
    this.user = id
  }
  
  submit() {
    this.form.value.date = +new Date(this.form.value.date);
    this.form.value.price = this.date.convertLocalToNum(this.form.value.price);
    this.form.value.user = this.user;
    if(!this.data){
      this.IncDecHttp.create(this.form.value).subscribe({
        next:(data:any)=>{
          this._snackBar.openFromComponent(SnackbarComponent, {
            data: `دستور با موفقیت انجام شد`,
            duration: 1000
          })
          this.dialogRef.close('success')
        },
        error:(err:any)=>{
          this._snackBar.openFromComponent(SnackbarComponent, {
            data: `خطا در انجام دستور!`,
            duration: 1000
          })
        },
      })
    }
    else {
      this.IncDecHttp.update(this.form.value,this.data.id).subscribe({
        next:(data:any)=>{
          this._snackBar.openFromComponent(SnackbarComponent, {
            data: `دستور با موفقیت انجام شد`,
            duration: 1000
          })
          this.dialogRef.close('success')
        },
        error:(err:any)=>{
          this._snackBar.openFromComponent(SnackbarComponent, {
            data: `خطا در انجام دستور!`,
            duration: 1000
          })
        },
      })
    }
  }
}
