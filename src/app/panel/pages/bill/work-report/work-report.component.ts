import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

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
        total_normal:'184',
        total_extra: '8',
        total_delay: '0'
    },
    {
        name: 'امین عادل',
        personal_code: '254856',
        total_time: '184',
        total_work: '204',
        total_normal:'184',
        total_extra: '20',
        total_delay: '0'
    },
    {
        name: 'ایوب طعته',
        personal_code: '874585',
        total_time: '184',
        total_work: '194',
        total_normal:'184',
        total_extra: '10',
        total_delay: '0'
    },
    {
        name: 'اکبر صادق پور',
        personal_code: '874685',
        total_time: '184',
        total_work: '180',
        total_normal:'180',
        total_extra: '0',
        total_delay: '4'
    },
    {
        name: 'وجیهه محمدرضا پور',
        personal_code: '985275',
        total_time: '184',
        total_work: '154',
        total_normal:'154',
        total_extra: '0',
        total_delay: '30'
    },
];

@Component({
    selector: 'app-work-report',
    templateUrl: './work-report.component.html',
    styleUrls: ['./work-report.component.scss']
})
export class WorkReportComponent {
    @ViewChild('input') input: ElementRef<HTMLInputElement>;
    myControl = new FormControl('');

    options: any[] = [
        {name: 'امید بیات', code: '1'},
        {name: 'امین عادل', code: '2'},
        {name: 'اکبر صادق پور', code: '3'},
        {name: 'ایوب طعنه', code: '4'},
        {name: 'وجیهه محمد رضا پور', code: '5'},
        {name: 'علی صفایی', code: '6'},
        {name: 'حمید حاجیلری', code: '7'},
        {name: 'امین بیات', code: '8'},
        {name: 'اصغر فرهادی', code: '9'},
        {name: 'کریم اکبری', code: '10'},
        {name: 'منصور انصاری', code: '11'},
    ];
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
        'action',
    ];
    dataSource = ELEMENT_DATA;

    report= false;
    info = false;
    moreInfo = false;

    constructor() {
        this.filteredOptions = this.options.slice();
    }

    filter(): void {
        const filterValue = this.input.nativeElement.value.toLowerCase();
        this.filteredOptions = this.options.filter(o => o.name.toLowerCase().includes(filterValue));
    }
    viewReport(){
        this.report = true;
        this.moreInfo = false;
        this.info = false;
    }

    viewInfo(){
        this.report = false;
        this.moreInfo = false;
        this.info = true;
    }
    viewMoreInfo(){
        this.report = false;
        this.moreInfo = true;
        this.info = false;
    }
}
