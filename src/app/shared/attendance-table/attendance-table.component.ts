import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { PersianNumberPipe } from "../pipe/persian-number.pipe";
import { AcceptComponent } from "../dialog/accept/accept.component";
import { EditLogComponent } from "../dialog/edit-log/edit-log.component";

export interface PeriodicElement {
	name: string;
	personal_code: number;
	device: string
	date: string;
	day: string;
	device_type: string;
	device_time: string;
	guard: string;
	guard_time: string;
	guard_type: string;
	reason: string;
	normal_work:string;
	extra_work:string;
	delay_work:string;
	total_work:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
	{
		name: 'امید بیات',
		personal_code: 1,
		date: '1402/09/06',
		day: 'دوشنبه',
		device_type: 'ورود',
		device_time: '7:59',
		guard_time: '8:59',
		guard_type: 'ورود',
		reason: 'خرابی ساعت دستگاه',
		guard: 'حمید حاجیلری',
		device: ' اداری ',
		normal_work:'8',
		extra_work:'2',
		delay_work:'0',
		total_work:'10'
	},
	{
		name: 'امین عادل',
		personal_code: 2,
		date: '1402/09/06',
		day: 'دوشنبه',
		device_type: 'ورود',
		device_time: '8:00',
		guard_time: '7:00',
		guard_type: 'ورود',
		reason: 'خرابی ساعت دستگاه',
		guard: 'حمید حاجیلری',
		device: ' اداری ',
		normal_work:'8',
		extra_work:'1',
		delay_work:'0',
		total_work:'9'
	},
	{
		name: 'ایوب طعنه',
		personal_code: 3,
		date: '1402/09/06',
		day: 'دوشنبه',
		device_type: 'خروج',
		device_time: '9:00',
		guard_time: '7:00',
		guard_type: 'خروج',
		reason: 'خرابی ساعت دستگاه',
		guard: 'حمید حاجیلری',
		device: ' اداری ',
		normal_work:'8',
		extra_work:'1',
		delay_work:'0',
		total_work:'9'
	},
	{
		name: 'اکبر صادقپور',
		personal_code: 4,
		date: '1402/09/06',
		day: 'دوشنبه',
		device_type: 'ورود',
		device_time: '10:00',
		guard_time: '8:00',
		guard_type: 'ورود',
		reason: 'خرابی ساعت دستگاه',
		guard: 'حمید حاجیلری',
		device: ' اداری ',
		normal_work:'8',
		extra_work:'4',
		delay_work:'0',
		total_work:'12'
	},
	{
		name: 'وجیهه محمدرضاپور',
		personal_code: 5,
		date: '1402/09/06',
		day: 'دوشنبه',
		device_type: 'ورود',
		device_time: '9:00',
		guard_time: '9:00',
		guard_type: 'خروج',
		reason: 'مغایرت ورود و خروج',
		guard: 'حمید حاجیلری',
		device: ' اداری ',
		normal_work:'8',
		extra_work:'0',
		delay_work:'0',
		total_work:'8'
	},
	{
		name: 'حمید حاجیلری',
		personal_code: 6,
		date: '1402/09/06',
		day: 'دوشنبه',
		device_type: 'خروج',
		device_time: '9:55',
		guard_time: '9:55',
		guard_type: 'ورود',
		reason: 'مغایرت ورود و خروج',
		guard: 'حمید حاجیلری',
		device: ' اداری ',
		normal_work:'7',
		extra_work:'0',
		delay_work:'1',
		total_work:'7'
	},
	{
		name: 'ابولفضل غریب',
		personal_code: 7,
		date: '1402/09/06',
		day: 'دوشنبه',
		device_type: 'ورود',
		device_time: '7:10',
		guard_time: '6:10',
		guard_type: 'ورود',
		reason: 'فراموشی کاربر برای ثبت زمان',
		guard: 'حمید حاجیلری',
		device: ' اداری ',
		normal_work:'8',
		extra_work:'2',
		delay_work:'0',
		total_work:'10'
	},
	{
		name: 'اکبر اکبری',
		personal_code: 8,
		date: '1402/09/06',
		day: 'دوشنبه',
		device_type: 'خروج',
		device_time: '6:53',
		guard_time: '7:53',
		guard_type: 'خروج',
		reason: 'فراموشی کاربر برای ثبت زمان',
		guard: ' حمید حاجیلری',
		device: ' اداری',
		normal_work:'6',
		extra_work:'0',
		delay_work:'2',
		total_work:'6'
	}

];

@Component({
	selector: 'app-attendance-table',
	templateUrl: './attendance-table.component.html',
	styleUrls: ['./attendance-table.component.scss'],
	providers:[PersianNumberPipe]
})
export class AttendanceTableComponent implements OnInit {
	displayedColumns: string[]
	dataSource = ELEMENT_DATA;
	
	@Input({required: true}) type: any;
	@Output()moreInfo:EventEmitter<any> = new EventEmitter<any>
	
	constructor(public dialog: MatDialog, private persianPip: PersianNumberPipe) {
	}
	
	ngOnInit() {
		if (['daily', 'accepted'].includes(this.type))
			this.displayedColumns = ['name', 'personal_code', 'device', 'date', 'day', 'device_type', 'device_time', 'action'];
		
		if (this.type == 'conflict')
			this.displayedColumns = ['name', 'personal_code', 'device', 'date', 'day', 'device_type', 'device_time', 'guard', 'guard_time', 'guard_type', 'reason', 'action'];
		
		if (this.type == 'report'){
			this.displayedColumns = ['name', 'personal_code', 'device', 'date', 'day','normal_work','extra_work','delay_work','total_work', 'action'];
		}
	}
	
	openAcceptDialog(item: any) {
		let message: any;
		
		if (this.type == 'conflict')
			message = `آیا از <b>${item.guard_type}</b> آقای/خانم <b>${item.name}</b> در ساعت <b>${this.persianPip.transform(item.guard_time)}</b> روز <b>  ${this.persianPip.transform(item.day)}</b>  تاریخ <b>${this.persianPip.transform(item.date)}</b> اطمینان دارید؟`
		
		if (this.type == 'daily')
			message = `آیا از <b>${item.device_type}</b> آقای/خانم <b>${item.name}</b> در ساعت <b>${this.persianPip.transform(item.device_time)}</b> روز <b>  ${this.persianPip.transform(item.day)}</b>  تاریخ <b>${this.persianPip.transform(item.date)}</b> اطمینان دارید؟`
		
		const dialogRef = this.dialog.open(AcceptComponent, {
			data: {message: message}
		})
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
		});
	}
	
	openEditDialog(item: any) {
		let data;
		if (this.type == 'daily') {
			data = {
				type: item.device_type,
				time: item.device_time
			}
		}
		if (this.type == 'conflict') {
			data = {
				type: item.guard_type,
				time: item.guard_time
			}
		}
		
		const dialogRef = this.dialog.open(EditLogComponent, {
			data: data
		})
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
		});
	}

	viewMoreInfo(){
		this.moreInfo.emit('more')
	}
}
