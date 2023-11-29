import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { CreateDeviceComponent } from "../../../../shared/dialog/create-device/create-device.component";
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
export class DevicesComponent {
  displayedColumns: string[] = ['position','name', 'ip', 'port', 'serial', 'status','action'];
  dataSource = ELEMENT_DATA;
  
  constructor(public dialog: MatDialog) {
  }
  openDialog(type:string,item:any){
  const dialogRef = this.dialog.open(CreateDeviceComponent,{
    data:{type:type,
    data:item
    }
  });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
    });
  }
}
