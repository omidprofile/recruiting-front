import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AttendanceService } from "../../../HttpServices/attendance.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../snackbar/snackbar.component";

@Component({
	selector: 'app-accept',
	templateUrl: './accept.component.html',
	styleUrls: ['./accept.component.scss']
})
export class AcceptComponent {
	constructor(
		public dialogRef: MatDialogRef<AcceptComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private http: AttendanceService,
		private _snackBar: MatSnackBar
	) {
	}
	
	submit() {
		let body = {'guard_confirm': true}
		this.http.updateAttendances(body, this.data.id, 'accept').subscribe({
			next: (data) => {
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `اطلاعات با موفقیت بروز رسانی شد`,
					duration: 1000
				})
				this.dialogRef.close('success')
			},
			error:(e)=>{
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `بروز رسانی اطلاعات با خطا مواجه شد`,
					duration: 1000
				})
		}
		})
	}
	
	onNoClick(): void {
		this.dialogRef.close();
	}
}
