import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AcceptComponent } from "../../../../shared/dialog/accept/accept.component";
import { PersianNumberPipe } from "../../../../shared/pipe/persian-number.pipe";
import { EditLogComponent } from "../../../../shared/dialog/edit-log/edit-log.component";


@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
  providers:[PersianNumberPipe]
})
export class DailyComponent {

  
}
