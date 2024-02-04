import { Component, OnInit } from '@angular/core';
import { UsersHttpService } from "../HttpServices/users-http.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
imgs:any;
exps:any;
  constructor(private http:UsersHttpService) {
  }
  ngOnInit() {
    this.http.getUsers({_id:'659fad9cf6d2badc0d4de8ee', gImg:true}).subscribe((data:any)=>{
      console.log(data[0])
      this.imgs = data[0].userImage;
      this.exps = data[0].employee_info.experiment[0].img
    })
  }
}
