import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { CreateDeviceComponent } from "../../../../shared/dialog/create-device/create-device.component";
import { AttendanceService } from "../../../../HttpServices/attendance.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";
export interface PeriodicElement {
  name: string;
  ip: string;
  port: number;
  serial: string;
  status:boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'اداری', ip: '122.22.33.66', port: 1844, serial: 'H123', status:true},
  {name: 'تولید', ip: '145.22.58.3', port: 1256, serial: '123He', status:true},
  {name: 'شایان', ip: '16.1.16.1', port: 1342, serial: 'Li546', status:true},
];
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit{
  displayedColumns: string[] = ['position','name', 'ip', 'port', 'serial', 'status','action'];
  dataSource :any;
  
  constructor(public dialog: MatDialog,
              private http:AttendanceService,
              private _snackBar: MatSnackBar,
              ) {
  }
  
  ngOnInit() {
    setTimeout(()=>{
      this.getDevices()
    })
  }
  
  getDevices(){
    let params ={};
    this.http.getDevices(params).subscribe({
      next:(data:any)=>{
        this.dataSource = data.devices
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: `اطلاعات با موفقیت بروز رسانی شد`,
          duration: 1500
        })
      },
      error:(e)=>{
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: `خطا در بروز رسانی اطلاعات`,
          duration: 1500
        })
      }
    })
  }
  openDialog(type:string,item:any){
  const dialogRef = this.dialog.open(CreateDeviceComponent,{
    data:{type:type,
    data:item
    }
  });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success'){
        this.getDevices()
      }
    });
  }
}
