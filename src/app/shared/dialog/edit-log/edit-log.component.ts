import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidationFormService } from "../../../services/validation-form.service";
import { FormValidateService } from "../../../services/form-validate.service";

@Component({
  selector: 'app-edit-log',
  templateUrl: './edit-log.component.html',
  styleUrls: ['./edit-log.component.scss']
})
export class EditLogComponent {
  
  form:FormGroup
  constructor(
      public dialogRef: MatDialogRef<EditLogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private validator:ValidationFormService,
      public validate:FormValidateService
  ) {
    this.form = new FormGroup({
      hour:new FormControl(null,[Validators.required, validator.number.bind(this),Validators.max(23)]),
      min:new FormControl(null,[Validators.required, validator.number.bind(this),Validators.max(59)]),
      type:new FormControl(null,[Validators.required]),
      reason:new FormControl(null,[Validators.required])
    })
  }
  
}
