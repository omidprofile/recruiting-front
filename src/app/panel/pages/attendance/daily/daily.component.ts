import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { PersianNumberPipe } from "../../../../shared/pipe/persian-number.pipe";


@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
  providers:[PersianNumberPipe]
})
export class DailyComponent {

  
}
