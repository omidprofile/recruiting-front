import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ErrorComponent implements OnInit {
	
	errorCode: any = '';
	
	constructor(private route: ActivatedRoute) {
	}
	
	ngOnInit() {
		this.errorCode = this.route.snapshot.data['errorCode'];
	}
}
