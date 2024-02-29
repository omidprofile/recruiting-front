import { Component, OnInit } from '@angular/core';
import { UsersHttpService } from "../HttpServices/users-http.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{

  constructor(private http:UsersHttpService) {
  }
  ngOnInit() {
  }
}
