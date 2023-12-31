import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidateService} from "../../services/form-validate.service";
import {STEPPER_GLOBAL_OPTIONS, StepperOrientation} from "@angular/cdk/stepper";
import { map, Observable, tap } from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ValidationFormService} from "../../services/validation-form.service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS} from "src/app/services/material.persian-date.adapter.service";
import { UsersHttpService } from "../../HttpServices/users-http.service";
import { RolesHttpService } from "../../HttpServices/roles-http.service";
import { RoleFormComponent } from "../role-form/role-form.component";
import { MatDialog } from "@angular/material/dialog";
import { BaseSalary } from "../dialog/create-baseSalary/base-salary.component";
import { CreateShiftComponent } from "../dialog/create-shift/create-shift.component";

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: {
                displayDefaultIndicatorType: false,
                showError: true
            },
        },
        {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},
        UsersHttpService
    ],
})
export class EmployeeFormComponent implements OnInit {

    baseInfo: FormGroup
    employeeInfo: FormGroup
    stepperOrientation: Observable<StepperOrientation>;
    companies:any
    collections:any;
    parts:any;
    ranks:any
    shifts:any;
    baseSalaries:any;
    constructor(public validate: FormValidateService,
                breakpointObserver: BreakpointObserver,
                private validator: ValidationFormService,
                private http:UsersHttpService,
                private roleHttp:RolesHttpService,
                public dialog: MatDialog
    ) {
        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
        this.baseInfo = new FormGroup({
            person: new FormGroup({
                name: new FormControl(null, [Validators.required,
                    this.validator.length.bind(this),
                    this.validator.persianString.bind(this)]),
                last_name: new FormControl(null, [Validators.required,
                    this.validator.length.bind(this),
                    this.validator.persianString.bind(this)]),
                father: new FormControl(null, [Validators.required,
                    this.validator.length.bind(this),
                    this.validator.persianString.bind(this)]),
                gender: new FormControl(null, [Validators.required]),
                national_code: new FormControl(null, [Validators.required,
                    this.validator.number.bind(this), this.validator.nationalCode.bind(this)]),
                certificate_code: new FormControl(null, [Validators.required,
                    this.validator.number.bind(this)]),
                birth_day: new FormControl(null, [Validators.required]),
                children: new FormControl(null,
                    [Validators.required, validator.number.bind(this)]),
                marital_status: new FormControl(null, [Validators.required]),
                military_service: new FormControl(null, [Validators.required]),
            }),
            connection: new FormGroup({
                mobile: new FormArray([
                    new FormControl(null, [Validators.required, this.validator.mobile.bind(this)]),
                ]),
                phone: new FormArray([
                    new FormControl(null, [Validators.required, this.validator.phone.bind(this)])
                ]),
                email: new FormArray([
                    new FormControl(null, [Validators.required, Validators.email])
                ]),
            }),
            address: new FormGroup({
                province: new FormControl(null, [Validators.required,]),
                city: new FormControl(null, [Validators.required,]),
                Village: new FormControl(null, [Validators.required,]),
                street: new FormControl(null, [Validators.required]),
                alley: new FormControl(null, [Validators.required]),
                Plaque: new FormControl(null, [Validators.required]),
                building: new FormControl(null, [Validators.required]),
                postal_code: new FormControl(null, [Validators.required,
                    this.validator.number.bind(this),
                    this.validator.nationalCode.bind(this)
                ]),
                full_address: new FormControl(null, [Validators.required])

            }),
            is_active: new FormControl(null, [Validators.required]),
        })
        this.employeeInfo = new FormGroup({
            job: new FormGroup({
                section: new FormControl(null, [Validators.required]),
                sector: new FormControl(null, [Validators.required]),
                rank: new FormControl(null, [Validators.required]),
                title: new FormControl(null, [Validators.required]),
                shift: new FormControl(null, [Validators.required]),
                baseSalary: new FormControl(null, [Validators.required]),
                start: new FormControl(null, [Validators.required]),
                education: new FormControl(null, [Validators.required, validator.persianString.bind(this)]),
                personal_code: new FormControl(null, [Validators.required, validator.number.bind(this)]),
                is_active: new FormControl(null, [Validators.required])
            }),
            insurance: new FormGroup({
                status: new FormControl(null, [Validators.required]),
                per_month: new FormControl(0, [Validators.required, validator.number.bind(this)]),
                history: new FormControl(null, [Validators.required]),
                start: new FormControl(0, [Validators.required]),
                code: new FormControl(0, [Validators.required, validator.number.bind(this)]),
            }),
            bank: new FormGroup({
                account: new FormControl(null, [Validators.required, validator.number.bind(this)]),
                card: new FormControl(null, [Validators.required, validator.number.bind(this)])
            }),
            experiment: new FormGroup({
                status: new FormControl(null, [Validators.required]),
                data: new FormArray([
                    new FormGroup({
                        date: new FormControl(null, [Validators.required]),
                        img: new FormControl(null, [Validators.required]),
                    })
                ])
            }),
            guaranty: new FormGroup({
                data:new FormArray([
                    new FormGroup({
                        code: new FormControl(null, [Validators.required,validator.number.bind(this)]),
                        img: new FormControl(null, [Validators.required]),
                    })
                ])
            }),
        })
    }
    
    async ngOnInit() {
        await this.getCompany();
    }
    
    async getCompany(){
      await this.roleHttp.getCompanies().subscribe({
          next:(data:any)=>{
              this.companies = data.companies
          },
          error:(err)=>{
              console.log(err)}
      })
    }
    
    async getCollection(){
        await this.roleHttp.getCollection(this.job.value.section).subscribe({
            next:(data:any)=>{
                this.collections = data.collections
            },
            error:(err)=>{
                console.log(err)}
        })
    }
    async getPart(){
        await this.roleHttp.getPart(this.job.value.sector).subscribe({
            next:(data:any)=>{
                this.parts = data.parts
            },
            error:(err)=>{
                console.log(err)}
        })
    }

    async getRank(){
        await this.roleHttp.getRank(this.job.value.rank).subscribe({
            next:(data:any)=>{
                this.ranks = data.ranks
            },
            error:(err)=>{
                console.log(err)}
        })
        await this.getShift();
        await this.getBaseSalary();
    }

    async getShift(){
        await this.roleHttp.getShift(this.job.value.rank).subscribe({
            next:(data:any)=>{
                this.shifts = data.shifts
            },
            error:(err)=>{
                console.log(err)}
        })
    }

    async getBaseSalary(){
        await this.roleHttp.getBaseSalary(this.job.value.rank).subscribe({
            next:(data:any)=>{
                this.baseSalaries = data.baseSalaries
            },
            error:(err)=>{
                console.log(err)}
        })
    }
    
     createShift(){
        const dialogRef = this.dialog.open(CreateShiftComponent, {
            data: {part:this.job.value.rank},
        });
        dialogRef.afterClosed().subscribe(async (result) => {
            if (result.created)
                await this.getShift()
    })
    }
    
    createBaseSalary(){
        const dialogRef = this.dialog.open(BaseSalary, {
            data: {part:this.job.value.rank},
        });
        dialogRef.afterClosed().subscribe(async (result) => {
            if (result.created)
               await this.getBaseSalary()
        })
    }
    
    
    onSubmit() {
        let formData = new FormData();
        formData.append('name',this.baseInfo.value.person?.name)
        formData.append('last_name',this.baseInfo.value.person?.last_name)
        formData.append('father',this.baseInfo.value.person?.father)
        formData.append('gender',this.baseInfo.value.person?.gender)
        formData.append('national_code',this.baseInfo.value.person?.national_code)
        formData.append('certificate_code',this.baseInfo.value.person?.certificate_code)
        formData.append('birth_day',(+new Date(this.baseInfo.value.person?.birth_day)).toString())
        formData.append('child',this.baseInfo.value.person?.children)
        formData.append('marital_status',this.baseInfo.value.person?.marital_status)
        formData.append('military_service',this.baseInfo.value.person?.military_service)
        formData.append('mobile',this.baseInfo.value.connection?.mobile)
        formData.append('phone',this.baseInfo.value.connection?.phone)
        formData.append('email',this.baseInfo.value.connection?.email)
        let address :any={};
        address.province=this.baseInfo.value.address?.province
        address.city=this.baseInfo.value.address?.city
        address.Village=this.baseInfo.value.address?.Village
        address.street=this.baseInfo.value.address?.street
        address.alley=this.baseInfo.value.address?.alley
        address.Plaque=this.baseInfo.value.address?.Plaque
        address.building=this.baseInfo.value.address?.building
        address.postal_code=this.baseInfo.value.address?.postal_code
        address.full_address=this.baseInfo.value.address?.full_address
        // formData.append('province',this.baseInfo.value.address?.province)
        // formData.append('city',this.baseInfo.value.address?.city)
        // formData.append('Village',this.baseInfo.value.address?.Village)
        // formData.append('street',this.baseInfo.value.address?.street)
        // formData.append('alley',this.baseInfo.value.address?.alley)
        // formData.append('Plaque',this.baseInfo.value.address?.Plaque)
        // formData.append('building',this.baseInfo.value.address?.building)
        // formData.append('postal_code',this.baseInfo.value.address?.postal_code)
        // formData.append('full_address',this.baseInfo.value.address?.full_address)

        formData.append('address',JSON.stringify(address));
        formData.append('is_active',this.baseInfo.value.is_active)
        formData.append('company_info',this.employeeInfo.value.job?.section)
        formData.append('collection_info',this.employeeInfo.value.job?.sector)
        formData.append('part_info',this.employeeInfo.value.job?.rank)
        formData.append('rank_info',this.employeeInfo.value.job?.title)
        formData.append('shift_info',this.employeeInfo.value.job?.shift)
        formData.append('baseSalary_info',this.employeeInfo.value.job?.baseSalary)
        formData.append('start_work',this.employeeInfo.value.job?.start)
        formData.append('education',this.employeeInfo.value.job?.education)
        formData.append('personal_code',this.employeeInfo.value.job?.personal_code)
        formData.append('insurance_status',this.employeeInfo.value.insurance?.status)
        formData.append('insurance_day',this.employeeInfo.value.insurance?.per_month)
        formData.append('insurance_history',this.employeeInfo.value.insurance?.history)
        formData.append('insurance_start',this.employeeInfo.value.insurance?.start)
        formData.append('insurance_code',this.employeeInfo.value.insurance?.code)
        formData.append('bank_account_number',this.employeeInfo.value.bank?.account)
        formData.append('bank_card',this.employeeInfo.value.bank?.card)
        formData.append('permission','')
        let experimentCounter = 0;
        
        for (let file of this.employeeInfo.value.experiment.data){
            formData.append(`experiment`,file.date)
            for(let img of file.img)
                formData.append(`experiment_${file.date}`, img);
            experimentCounter++;
        }
        let guaranteeCounter = 0
        for (let file of this.employeeInfo.value.guaranty.data){
            formData.append(`guarantee`,file.code)
            for(let img of file.img)
                formData.append(`guarantee_${file.code}`, img);
            guaranteeCounter++
        }
        
        this.http.createUser(formData).subscribe({
            next:(data)=>{
                console.log(data)},
            error:(err)=>{
                console.log(err)},
        })
    }

    get job() {
        return this.employeeInfo.get('job') as FormGroup
    }

    get insurance() {
        return this.employeeInfo.get('insurance') as FormGroup
    }

    rmInsurance(){
        this.insurance.get('per_month')?.setValidators([])
        this.insurance.get('per_month')?.setValue(0)
        this.insurance.get('start')?.setValidators([])
        this.insurance.get('start')?.setValue(0)
        this.insurance.get('code')?.setValidators([])
        this.insurance.get('code')?.setValue('')
        this.insurance.get('per_month')?.updateValueAndValidity()
        this.insurance.get('start')?.updateValueAndValidity()
        this.insurance.get('code')?.updateValueAndValidity()
    }

    addInsurance(){

        this.insurance.get('per_month')?.setValidators([Validators.required])
        this.insurance.get('start')?.setValidators([Validators.required])
        this.insurance.get('code')?.setValidators([Validators.required, this.validator.number.bind(this)])
        this.insurance.get('per_month')?.updateValueAndValidity()
        this.insurance.get('start')?.updateValueAndValidity()
        this.insurance.get('code')?.updateValueAndValidity()
    }

    get bank() {
        return this.employeeInfo.get('bank') as FormGroup

    }

    get experiment() {
        return this.employeeInfo.get('experiment') as FormGroup
    }

    get experiment_data() {
        return this.experiment.get('data') as FormArray
    }
    
    addExperiment() {
        this.experiment_data.push(
            new FormGroup({
                date: new FormControl(null, [Validators.required]),
                img: new FormControl(null, [Validators.required]),
            })
        )
    }

    removeExperiment(i: number) {
        if (this.experiment_data.length > 1) {
            this.experiment_data.removeAt(i)
        }
    }

    rmExperiment(){
        for (let crl of this.experiment_data.controls){
            crl.get('date')?.setValidators([])
            crl.get('img')?.setValidators([])
            crl.get('date')?.updateValueAndValidity()
            crl.get('img')?.updateValueAndValidity()
        }
    }
    addExperimentV(){
        for (let crl of this.experiment_data.controls){
            crl.get('date')?.setValidators([Validators.required])
            crl.get('img')?.setValidators([Validators.required])
            crl.get('date')?.updateValueAndValidity()
            crl.get('img')?.updateValueAndValidity()
        }
    }

    experimentUrls: any[] = [];
    experimentSelectImages:any[]=[];

    handleExperimentFileInputChange(file: any, index: number): void {
        if (file.length) {
            for (let i = 0; i < file.length; i++) {
                const f = file[i];
                this.experimentSelectImages.push(f)
                let reader = new FileReader()
                reader.onload = (e: any) => {
                    let data = {
                        name:f.name,
                        url:e.target.result
                    }
                    this.experimentUrls.push(data)
                }
                reader.readAsDataURL(f)
            }
            this.experiment_data.controls[index].get('img')?.patchValue(this.experimentSelectImages);
        }
    }

    deleteExperimentImage(name:any, index:number){
        this.experimentSelectImages = this.experimentSelectImages.filter(item=>item.name != name)
        this.experimentUrls = this.experimentUrls.filter(item=>item.name != name)
        if (this.experimentSelectImages.length){
            this.experiment_data.controls[index].get('img')?.patchValue(this.experimentSelectImages);
        }
        else {
            this.experiment_data.controls[index].get('img')?.patchValue("");
        }

    }

    get guaranty() {
        return this.employeeInfo.get('guaranty') as FormGroup
    }

    get guaranty_data() {
        return this.guaranty.get('data') as FormArray
    }

    guarantyUrls: any[] = [];
    guarantySelectImages:any[]=[];

    handleGuarantyFileInputChange(file: any, index: number): void {
        if (file.length) {
            for (let i = 0; i < file.length; i++) {
                const f = file[i];
                this.guarantySelectImages.push(f)
                let reader = new FileReader()
                reader.onload = (e: any) => {
                    let data = {
                        name:f.name,
                        url:e.target.result
                    }
                    this.guarantyUrls.push(data)
                }
                reader.readAsDataURL(f)
            }
            this.guaranty_data.controls[index].get('img')?.patchValue(this.guarantySelectImages);
        }
        // else {
        //     this.experiment_data.controls[index].get('img')?.patchValue("");
        // }
    }

    deleteGuarantyImage(name:any, index:number){
        this.guarantySelectImages = this.guarantySelectImages.filter(item=>item.name != name)
        this.guarantyUrls = this.guarantyUrls.filter(item=>item.name != name)
        if (this.guarantySelectImages.length){
            this.experiment_data.controls[index].get('img')?.patchValue(this.guarantySelectImages);
        }
        else {
            this.experiment_data.controls[index].get('img')?.patchValue("");
        }

    }

    get person() {
        return this.baseInfo.get('person') as FormGroup;
    }

    get connection() {
        return this.baseInfo.get('connection') as FormGroup;
    }

    get address() {
        return this.baseInfo.get('address') as FormGroup;
    }

    get mobile() {
        return this.connection.get('mobile') as FormArray;
    }

    get phone() {
        return this.connection.get('phone') as FormArray;
    }

    get email() {
        return this.connection.get('email') as FormArray;
    }

    public addMobile() {
        const add = this.connection.get('mobile') as FormArray;
        add.push(new FormControl(null, [Validators.required, this.validator.mobile.bind(this)]));
    }

    public removeMobile(i: number) {
        const remove = this.connection.get('mobile') as FormArray
        if (remove.length > 1)
            remove.removeAt(i)
    }

    public addPhone() {
        const add = this.connection.get('phone') as FormArray
        add.push(new FormControl(null, [Validators.required, this.validator.phone.bind(this)]))
    }

    public removePhone(i: number) {
        const remove = this.connection.get('phone') as FormArray
        if (remove.length > 1)
            remove.removeAt(i)
    }

    public addEmail() {
        const add = this.connection.get('email') as FormArray
        add.push(new FormControl(null, [Validators.required, Validators.email]))
    }

    public removeEmail(i: number) {
        const remove = this.connection.get('email') as FormArray
        if (remove.length > 1)
            remove.removeAt(i)
    }



    test(value:any) {
        const formData = new FormData();
        formData.append('date',value.value.data[0].date)
        formData.append("personal", "ali")
        for (let img of value.value.data[0].img)
            formData.append("personal", img);
        console.log(value.value.data)
        console.log(formData.getAll("value"))
        this.http.test(formData).pipe(
            tap((data)=>{
                console.log(data)
            })
        ).subscribe({
            error:(err)=>{
                console.log(err)}
        })
    }




}
