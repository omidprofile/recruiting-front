import { Component, Inject } from '@angular/core';
import { IncDecHttpService } from "../../../HttpServices/inc-dec-http.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../snackbar/snackbar.component";

@Component({
  selector: 'app-inc-dec-confirm',
  templateUrl: './inc-dec-confirm.component.html',
  styleUrls: ['./inc-dec-confirm.component.scss']
})
export class IncDecConfirmComponent {

  constructor(
      private IncDecHttp:IncDecHttpService,
      public dialogRef: MatDialogRef<IncDecConfirmComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _snackBar: MatSnackBar,
  ) {
  }
  
  submit(){
    this.IncDecHttp.update({confirm:true},this.data.id).subscribe({
      next:(data:any)=>{
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: `تایید با موفقیت انجام شد`,
          duration: 1000
        })
        this.dialogRef.close('success')
      },
      error:(err:any)=>{
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: `خطا در انجام تایید!`,
          duration: 1000
        })
      },
    })
  }
}
