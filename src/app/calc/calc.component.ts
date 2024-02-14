import { Component } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from "../services/material.persian-date.adapter.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateService } from "../services/date.service";

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
  providers:[
    {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},]
})
export class CalcComponent {
form:FormGroup
  days = 0;
  constructor(private date:DateService) {
  this.form = new FormGroup({
    start:new FormControl(null, [Validators.required]),
    end:new FormControl(null, [Validators.required])
  })
  }
  
  calc(){
    this.days = (+new Date(this.form.value.end) - +new Date(this.form.value.start))/86400000
  }
}
