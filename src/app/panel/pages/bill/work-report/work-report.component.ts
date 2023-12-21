import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { UsersHttpService } from "../../../../HttpServices/users-http.service";
import { MatDialog } from "@angular/material/dialog";
import { ConflictDialogComponent } from "../../../../shared/dialog/conflict-dialog/conflict-dialog.component";
import { tap } from "rxjs";

export interface PeriodicElement {
	name: string;
	personal_code: string;
	total_time: string;
	total_normal: string;
	total_work: string;
	total_extra: string;
	total_delay: string
}

const ELEMENT_DATA: PeriodicElement[] = [
	{
		name: 'امید بیات',
		personal_code: '123465',
		total_time: '184',
		total_work: '192',
		total_normal: '184',
		total_extra: '8',
		total_delay: '0'
	},
	{
		name: 'امین عادل',
		personal_code: '254856',
		total_time: '184',
		total_work: '204',
		total_normal: '184',
		total_extra: '20',
		total_delay: '0'
	},
	{
		name: 'ایوب طعته',
		personal_code: '874585',
		total_time: '184',
		total_work: '194',
		total_normal: '184',
		total_extra: '10',
		total_delay: '0'
	},
	{
		name: 'اکبر صادق پور',
		personal_code: '874685',
		total_time: '184',
		total_work: '180',
		total_normal: '180',
		total_extra: '0',
		total_delay: '4'
	},
	{
		name: 'وجیهه محمدرضا پور',
		personal_code: '985275',
		total_time: '184',
		total_work: '154',
		total_normal: '154',
		total_extra: '0',
		total_delay: '30'
	},
];

@Component({
	selector: 'app-work-report',
	templateUrl: './work-report.component.html',
	styleUrls: ['./work-report.component.scss']
})
export class WorkReportComponent implements OnInit {
	@ViewChild('input') input: ElementRef<HTMLInputElement>;
	myControl = new FormControl('');
	
	options: any;
	filteredOptions: any[];
	
	displayedColumns: string[] = [
		'No',
		'name',
		'personal_code',
		'total_time',
		'total_normal',
		'total_extra',
		'total_delay',
		'total_work',
		'conflict',
		'action',
	];
	dataSource :any;
	
	report = false;
	info = false;
	moreInfo = false;
	loading = false;
	constructor(
		private http: UsersHttpService,
		public dialog: MatDialog,	) {
	}
	
	ngOnInit() {
		this.getUsers()
	}
	
	getUsers() {
		this.http.getUsers().subscribe((data: any) => {
			this.options = []
			for (let item of data) {
				let person: any = {}
				person.name = item.user_id.name + " " + item.user_id.last_name
				person.code = item.personal_code
				person.id = item._id
				this.options.push(person)
			}
			this.filteredOptions = this.options.slice();
		})
	}
	
	filter(): void {
		const filterValue = this.input.nativeElement.value.toLowerCase();
		this.filteredOptions = this.options.filter((o: any) => o.name.toLowerCase().includes(filterValue));
	}
	
	day: any;
	month: any;
	year: any;
	user: any;
	
	viewReport() {
		this.report = true;
		this.moreInfo = false;
		this.info = false;
		let body: any = {}
		body.type = 'report'
		body.day = this.day;
		body.month = this.month;
		body.year = this.year;
		body.user = this.user;
		this.loading = true;
		this.http.getLogs(body)
			.subscribe({
			next: (data: any) => {
				this.loading = false
				this.dataSource = []
				data = data.data;
				let item: any = {}
				for (let user in data) {
					let month = data[user]
                    item = {}
                    item.total_time = 0
                    item.total_normal = 0
					item.total_work = 0
					item.holidays = 0
					item.dayLength = Object.keys(month).length
					item.conflict = false;
					item.conflict_arr = []
     
					for (let day in month) {
						let logs = month[day]
                        
                        if (logs[0]?.shift && !logs[0]?.is_holiday)
	                        item.total_time += logs[0].shift.force_time
                        
                        
						if(logs[0]?.is_holiday)
							item.holidays++
						
						for (let log of logs) {
                            if (item.name == undefined && log.user)
								item.name = log.user.user_id.name+" "+log.user.user_id.last_name
							
							if (item.personal_code == undefined)
								item.personal_code = log.personal_code
							
							if (log?.duration)
								item.total_work += +log.duration
							
							if (log?.conflict == true){
								item.conflict = true
								item.conflict_arr.push(logs)
							}
						}
					}
					item.total_normal = item.total_work >= item.total_time ?item.total_time:item.total_work
					item.total_extra = item.total_work-item.total_time > 0?item.total_work-item.total_time:0
					item.total_delay = item.total_time -item.total_work>0 ?item.total_time -item.total_work: 0
					this.dataSource.push(item)
				}
			},
			error: (e) => {
				console.log(e)
			}
		})
	}
	
	viewInfo() {
		this.report = false;
		this.moreInfo = false;
		this.info = true;
	}
	
	viewMoreInfo() {
		this.report = false;
		this.moreInfo = true;
		this.info = false;
	}
	
	createHour(hour:any){
		let result = Math.floor(hour)+":"
		let min = hour - Math.floor(hour);
		min = min*60;
		result = result + (min ==0?"00:":Math.floor(min)+":")
		let sec = min - Math.floor(min)
		sec = sec*60;
		result = result+ (sec == 0?"00":Math.floor(sec))
		return result
	}
	
	conflict(element:any){
		console.log(element)
		
		const dialogRef = this.dialog.open(ConflictDialogComponent, {
			data: element,
		})
		dialogRef.afterClosed().subscribe(result => {
			console.log('done')
		});
	}
	
}
