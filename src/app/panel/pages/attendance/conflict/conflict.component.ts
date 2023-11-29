import { Component } from '@angular/core';
import { PersianNumberPipe } from "../../../../shared/pipe/persian-number.pipe";

@Component({
  selector: 'app-conflict',
  templateUrl: './conflict.component.html',
  styleUrls: ['./conflict.component.scss'],
  providers:[PersianNumberPipe]
})
export class ConflictComponent {

}
