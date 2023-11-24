import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements AfterViewInit {
	
	@Input({required:true}) dataSource: any;
	@Output() changeData = new EventEmitter()
	dataTable: any;
	itemTotal: number = 0;
	pageNumber = 0
	perPageItem = 5
	startPageItem = 1;
	endPageItem = this.perPageItem;
	selected = this.perPageItem;
	
	ngAfterViewInit() {
		setTimeout(()=>{
			this.itemTotal = this.dataSource.length;
			this.dataTable = this.dataSource;
			this.renderTable()
		},10)
	}
	
	next() {
		(this.pageNumber * this.perPageItem) < this.itemTotal ?
			this.pageNumber++
			: this.pageNumber
		if (this.pageNumber != 0 && this.endPageItem < this.itemTotal) {
			this.startPageItem += this.perPageItem;
			(this.endPageItem + this.perPageItem) <= this.itemTotal ?
				this.endPageItem += this.perPageItem :
				this.endPageItem = this.itemTotal
		}
		this.renderTable()
	}
	
	previous() {
		(this.pageNumber * this.perPageItem) > this.perPageItem ?
			this.pageNumber--
			: this.pageNumber
		if (this.pageNumber != 0 && this.startPageItem > 1) {
			this.endPageItem -= (this.endPageItem - this.startPageItem + 1);
			(this.startPageItem - this.perPageItem) > 0 ?
				this.startPageItem -= this.perPageItem :
				this.startPageItem = 1;
			
		}
		this.renderTable()
	}
	
	goLast() {
		if (this.itemTotal - this.perPageItem > 0) {
			this.pageNumber = Math.ceil(this.itemTotal / this.endPageItem);
			this.startPageItem = this.itemTotal - this.perPageItem + 1;
			this.endPageItem = this.itemTotal;
		}
		
		this.renderTable();
	}
	
	goFirst() {
		this.startPageItem = 1;
		this.perPageItem < this.itemTotal ?
			this.endPageItem = this.startPageItem + this.perPageItem - 1
			: this.endPageItem = this.itemTotal;
		
		this.renderTable();
	}
	
	changePerPage(value: any) {
		this.perPageItem = value;
		this.endPageItem = value;
		this.renderTable();
	}
	
	
	renderTable() {
		this.endPageItem > this.itemTotal ? this.endPageItem = this.itemTotal : ''
		this.dataSource = this.dataTable.filter((value: any, index: any) =>
			(index + 1) >= this.startPageItem && (index + 1) <= this.endPageItem
		)
		this.changeData.emit(this.dataSource);
	}
}
