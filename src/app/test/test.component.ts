import { Component, OnInit } from '@angular/core';
import { UsersHttpService } from "../HttpServices/users-http.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
imgs:any;
  constructor(private http:UsersHttpService) {
  }
  ngOnInit() {
    this.http.getUsers({_id:'659276107877cbcce496b1df'}).subscribe((data:any)=>{
      console.log(data)
      this.imgs = data[0].userImage;
    })
  }
}
