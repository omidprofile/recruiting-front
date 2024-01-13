import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: 'app-usercreated',
	templateUrl: './usercreated.component.html',
	styleUrls: ['./usercreated.component.scss']
})
export class UsercreatedComponent {
	name: any;
	personal_code: any;
	device_id: any;
	companyMail: any;
	
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<UsercreatedComponent>,
		
	) {
      this.name = data?.name;
      this.personal_code = data?.personal_code;
      this.device_id = data?.device_id;
      this.companyMail = data?.companyMail;
	}
	
	
}
