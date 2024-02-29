import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidateService} from "../../services/form-validate.service";
import {STEPPER_GLOBAL_OPTIONS, StepperOrientation} from "@angular/cdk/stepper";
import {map, Observable, tap} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ValidationFormService} from "../../services/validation-form.service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {
    MaterialPersianDateAdapter,
    PERSIAN_DATE_FORMATS
} from "src/app/services/material.persian-date.adapter.service";
import {UsersHttpService} from "../../HttpServices/users-http.service";
import {RolesHttpService} from "../../HttpServices/roles-http.service";
import {RoleFormComponent} from "../role-form/role-form.component";
import {MatDialog} from "@angular/material/dialog";
import {BaseSalary} from "../dialog/create-baseSalary/base-salary.component";
import {CreateShiftComponent} from "../dialog/create-shift/create-shift.component";
import {SnackbarComponent} from "../snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatStepper} from "@angular/material/stepper";
import {InsuranceComponent} from "../dialog/insurance/insurance.component";
import {InsuranceService} from "../../HttpServices/insurance.service";
import {Router} from "@angular/router";
import {DateService} from "../../services/date.service";
import {UsercreatedComponent} from "../dialog/usercreated/usercreated.component";

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
        UsersHttpService,
    ],
})
export class EmployeeFormComponent implements OnInit {

    baseInfo: FormGroup
    employeeInfo: FormGroup
    stepperOrientation: Observable<StepperOrientation>;
    companies: any
    collections: any;
    parts: any;
    ranks: any
    shifts: any;
    baseSalaries: any;
    insurances: any;

    constructor(public validate: FormValidateService,
                breakpointObserver: BreakpointObserver,
                private validator: ValidationFormService,
                private http: UsersHttpService,
                private roleHttp: RolesHttpService,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private route: Router,
                private date: DateService
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
                name_en: new FormControl(null, [Validators.required,
                    this.validator.length.bind(this),
                    this.validator.englishString.bind(this)]),
                last_name_en: new FormControl(null, [Validators.required,
                    this.validator.length.bind(this),
                    this.validator.englishString.bind(this)]),
                user_img: new FormControl(null, [Validators.required]),
                father: new FormControl(null, [Validators.required,
                    this.validator.length.bind(this),
                    this.validator.persianString.bind(this)]),
                gender: new FormControl(null, [Validators.required]),
                national_code: new FormControl(null, [Validators.required,
                    this.validator.number.bind(this), this.validator.nationalCode.bind(this)]),
                certificate_code: new FormControl(null, [Validators.required,
                    this.validator.number.bind(this)]),
                education: new FormControl(null, [Validators.required, validator.persianString.bind(this)]),
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
        })
        this.employeeInfo = new FormGroup({
            job: new FormGroup({
                section: new FormControl(null, [Validators.required]),
                sector: new FormControl(null, [Validators.required]),
                rank: new FormControl(null, [Validators.required]),
                title: new FormControl(null, [Validators.required]),
                shift: new FormControl(null, [Validators.required]),
                baseSalary: new FormControl(null, [Validators.required]),
                insurance: new FormControl(null, [Validators.required]),
                increaseSalary: new FormControl('', [Validators.required, Validators.min(0), validator.currency.bind(this)]),
                decreaseSalary: new FormControl('', [Validators.required, Validators.min(0), validator.currency.bind(this)]),
                rewardMonthly: new FormControl('', [Validators.required, Validators.min(0), validator.currency.bind(this)]),
                dependentChildren: new FormControl('', [Validators.required, Validators.min(0), Validators.max(2)]),
                start: new FormControl(null, [Validators.required]),
                device_id: new FormControl(null, []),
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
                data: new FormArray([
                    new FormGroup({
                        code: new FormControl(null, [Validators.required, validator.number.bind(this)]),
                        img: new FormControl(null, [Validators.required]),
                    })
                ])
            }),
        })
    }

    async ngOnInit() {
        await this.getCompany();
        await this.getBaseSalary();
    }

    onSubmit(stepper: MatStepper) {
        let formData = new FormData();
        formData.append('name', this.baseInfo.value.person?.name)
        formData.append('last_name', this.baseInfo.value.person?.last_name)
        formData.append('name_en', this.baseInfo.value.person?.name_en)
        formData.append('last_name_en', this.baseInfo.value.person?.last_name_en)
        formData.append('father', this.baseInfo.value.person?.father)
        formData.append('gender', this.baseInfo.value.person?.gender)
        formData.append('national_code', this.baseInfo.value.person?.national_code)
        formData.append('certificate_code', this.baseInfo.value.person?.certificate_code)
        for (let img of this.baseInfo.value.person?.user_img)
            formData.append('userImage', img)

        formData.append('education', this.baseInfo.value.person?.education)
        formData.append('birth_day', (+new Date(this.baseInfo.value.person?.birth_day)).toString())
        formData.append('child', this.baseInfo.value.person?.children)
        formData.append('marital_status', this.baseInfo.value.person?.marital_status)
        formData.append('military_service', this.baseInfo.value.person?.military_service)
        formData.append('mobile', this.baseInfo.value.connection?.mobile)
        formData.append('phone', this.baseInfo.value.connection?.phone)
        formData.append('email', this.baseInfo.value.connection?.email)
        let address: any = {};
        address.province = this.baseInfo.value.address?.province
        address.city = this.baseInfo.value.address?.city
        address.Village = this.baseInfo.value.address?.Village
        address.street = this.baseInfo.value.address?.street
        address.alley = this.baseInfo.value.address?.alley
        address.Plaque = this.baseInfo.value.address?.Plaque
        address.building = this.baseInfo.value.address?.building
        address.postal_code = this.baseInfo.value.address?.postal_code
        address.full_address = this.baseInfo.value.address?.full_address
        // formData.append('province',this.baseInfo.value.address?.province)
        // formData.append('city',this.baseInfo.value.address?.city)
        // formData.append('Village',this.baseInfo.value.address?.Village)
        // formData.append('street',this.baseInfo.value.address?.street)
        // formData.append('alley',this.baseInfo.value.address?.alley)
        // formData.append('Plaque',this.baseInfo.value.address?.Plaque)
        // formData.append('building',this.baseInfo.value.address?.building)
        // formData.append('postal_code',this.baseInfo.value.address?.postal_code)
        // formData.append('full_address',this.baseInfo.value.address?.full_address)

        formData.append('address', JSON.stringify(address));
        formData.append('company_info', this.employeeInfo.value.job?.section)
        formData.append('collection_info', this.employeeInfo.value.job?.sector)
        formData.append('part_info', this.employeeInfo.value.job?.rank)
        formData.append('rank_info', this.employeeInfo.value.job?.title)
        formData.append('shift_info', this.employeeInfo.value.job?.shift)
        formData.append('baseSalary_info', this.employeeInfo.value.job?.baseSalary)
        formData.append('insurance_info', this.employeeInfo.value.job?.insurance)
        formData.append('increaseSalary', this.date.convertLocalToNum(this.employeeInfo.value.job?.increaseSalary).toString())
        formData.append('decreaseSalary', this.date.convertLocalToNum(this.employeeInfo.value.job?.decreaseSalary).toString())
        formData.append('rewardMonthly', this.date.convertLocalToNum(this.employeeInfo.value.job?.rewardMonthly).toString())
        formData.append('dependentChildren', this.date.convertLocalToNum(this.employeeInfo.value.job?.dependentChildren).toString())
        formData.append('start_work', this.employeeInfo.value.job?.start)
        formData.append('device_id', this.employeeInfo.value.job?.device_id)
        formData.append('insurance_status', this.employeeInfo.value.insurance?.status)
        formData.append('insurance_day', this.employeeInfo.value.insurance?.per_month)
        formData.append('insurance_history', this.employeeInfo.value.insurance?.history)
        formData.append('insurance_start', this.employeeInfo.value.insurance?.start)
        formData.append('insurance_code', this.employeeInfo.value.insurance?.code)
        formData.append('bank_account_number', this.employeeInfo.value.bank?.account)
        formData.append('bank_card', this.employeeInfo.value.bank?.card)
        formData.append('permission', '')
        let experimentCounter = 0;
        for (let file of this.employeeInfo.value.experiment.data) {
            if (file.date && file.img) {
                formData.append(`experiment`, file.date)
                for (let img of file.img)
                    formData.append(`experiment_${file.date}`, img);
                experimentCounter++;
            }
        }
        let guaranteeCounter = 0
        for (let file of this.employeeInfo.value.guaranty.data) {
            if (file.code && file.img) {
                formData.append(`guarantee`, file.code)
                for (let img of file.img)
                    formData.append(`guarantee_${file.code}`, img);
                guaranteeCounter++
            }
        }

        this.http.createUser(formData).subscribe({
            next: async (data) => {
                this._snackBar.openFromComponent(SnackbarComponent, {
                    data: `کاربر با موفقیت ایجاد شد`,
                    duration: 1500
                })
                const dialogRef = this.dialog.open(UsercreatedComponent, {
                    width: '600px',
                    disableClose: true,
                    data: data,
                });
                dialogRef.afterClosed().subscribe(async () => {
                    this.baseInfo.reset();
                    this.employeeInfo.reset();
                    stepper.reset();
                    await this.ngOnInit();
                    await this.route.navigate(['/panel/users/list']);
                })
            },
            error: (err) => {
                this._snackBar.openFromComponent(SnackbarComponent, {
                    data: `خطا در ایجاد کاربر لطفا مقادیر مجددا بررسی شود`,
                    duration: 1500
                })
            }

        })
    }

    validateUser(stepper: MatStepper) {
        let body = {
            ...(this.person.value.national_code != null && {national_code: this.person.value.national_code}),
            // ...(this.person.value.certificate_code != null && {certificate_code: this.person.value.certificate_code}),
            ...(this.connection.value.mobile[0] != null && {mobile: this.connection.value.mobile}),
            ...(this.connection.value.phone[0] != null && {phone: this.connection.value.phone}),
            ...(this.connection.value.email[0] != null && {email: this.connection.value.email}),
            ...(this.address.value.postal_code != null && {postal_code: this.address.value.postal_code}),
        }
        this.http.validateUser(body, 'user').subscribe({
                next: (data: any) => {
                    data = data.result
                    if (data.national_code == false)
                        this.person.get('national_code')?.setErrors({duplicate: true})
                    // if (data.certificate_code == false)
                    // 	this.person.get('certificate_code')?.setErrors({duplicate: true})
                    if (data.postal_code == false)
                        this.address.get('postal_code')?.setErrors({duplicate: true})
                    if (data.mobile?.length) {
                        for (let i = 0; i < data.mobile.length; i++) {
                            if (data.mobile[i] == false)
                                this.mobile.controls[i].setErrors({duplicate: true})
                        }
                    }
                    if (data.phone?.length) {
                        for (let i = 0; i < data.phone.length; i++) {
                            if (data.phone[i] == false)
                                this.phone.controls[i].setErrors({duplicate: true})
                        }
                    }
                    if (data.email?.length) {
                        for (let i = 0; i < data.email.length; i++) {
                            if (data.email[i] == false)
                                this.email.controls[i].setErrors({duplicate: true})
                        }
                    }
                    if (!Object.values(data)?.includes(false) && !data.phone?.includes(false) && !data.mobile?.includes(false))
                        stepper.next();
                },
                error: (err) => {
                }
            }
        )
    }

    validateEmployee(stepper: MatStepper) {
        let body = {
            ...(this.insurance.value.code != 0 && {insurance_code: this.insurance.value.code}),
            ...(this.bank.value.card != null && {bank_card: this.bank.value.card}),
            ...(this.bank.value.account != null && {bank_account_number: this.bank.value.account}),
            ...(this.guaranty_data.value[0].code != null && {guarantee: this.guaranty_data.value}),
        }
        this.http.validateUser(body, 'employee').subscribe({
            next: (data: any) => {
                data = data.result
                if (data.insurance_code == false)
                    this.insurance?.get('code')?.setErrors({duplicate: true})
                if (data.bank_card == false)
                    this.bank.get('card')?.setErrors({duplicate: true})
                if (data.bank_account_number == false)
                    this.bank.get('account')?.setErrors({duplicate: true})
                if (data.guarantee?.length) {
                    for (let i = 0; i < data.guarantee.length; i++) {
                        if (data.guarantee[i] == false)
                            this.guaranty_data.controls[i].get('code')?.setErrors({duplicate: true})
                    }
                }
                if (!Object.values(data)?.includes(false) && !data.guarantee?.includes(false))
                    stepper.next();
            },
            error: (err) => {
            }
        })
    }

    async getCompany() {
        await this.roleHttp.getCompanies().subscribe({
            next: (data: any) => {
                this.companies = data.companies
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    async getCollection() {
        await this.roleHttp.getCollection(this.job.value.section).subscribe({
            next: (data: any) => {
                this.collections = data.collections
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    async getPart() {
        await this.roleHttp.getPart(this.job.value.sector).subscribe({
            next: (data: any) => {
                this.parts = data.parts
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    async getRank() {
        await this.roleHttp.getRank(this.job.value.rank).subscribe({
            next: (data: any) => {
                this.ranks = data.ranks
            },
            error: (err) => {
                console.log(err)
            }
        })
        await this.getShift();
        await this.getInsurance();
    }

    async getShift() {
        await this.roleHttp.getShift(this.job.value.rank).subscribe({
            next: (data: any) => {
                this.shifts = data.shifts
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    async getBaseSalary() {
        await this.roleHttp.getBaseSalary().subscribe({
            next: (data: any) => {
                this.baseSalaries = data.baseSalaries
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    async getInsurance() {
        await this.roleHttp.getInsurance(this.job.value.rank).subscribe({
            next: (data: any) => {
                this.insurances = data.insurances
            },
            error: (err) => {
                console.log(err)
            }
        })
    }


    openDialog(type: string, title: string, parent?: any, value?: any): void {
        if (type == 'collection')
            parent = this.companies.filter((e: any) => e._id == parent)
        if (type == 'part')
            parent = this.collections.filter((e: any) => e._id == parent)
        if (type == 'rank')
            parent = this.parts.filter((e: any) => e._id == parent)

        const dialogRef = this.dialog.open(RoleFormComponent, {
            data: {type: type, parent: parent, title: title, value: value},
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result.created) {
                if (type == 'company')
                    await this.getCompany()
                if (type == 'collection')
                    await this.getCollection()
                if (type == 'part')
                    await this.getPart()
                if (type == 'rank')
                    await this.getRank()
            }
        });
    }

    createShift() {
        const dialogRef = this.dialog.open(CreateShiftComponent, {
            data: {part: this.job.value.rank},
        });
        dialogRef.afterClosed().subscribe(async (result) => {
            if (result.created)
                await this.getShift()
        })
    }

    createBaseSalary() {
        let shift = this.shifts.filter((e: any) => {
            if (e._id == this.job.value.shift)
                return e
        })
        const dialogRef = this.dialog.open(BaseSalary, {
            data: {part: this.job.value.rank, shift: shift},
        });
        dialogRef.afterClosed().subscribe(async (result) => {
            if (result.created)
                await this.getBaseSalary()
        })
    }

    createInsurance() {
        const dialogRef = this.dialog.open(InsuranceComponent, {
            data: {part: this.job.value.rank},
        });
        dialogRef.afterClosed().subscribe(async (result) => {
            if (result.created)
                await this.getInsurance()
        })
    }

    get job() {
        return this.employeeInfo.get('job') as FormGroup
    }

    get insurance() {
        return this.employeeInfo.get('insurance') as FormGroup
    }

    rmInsurance() {
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

    addInsurance() {

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

    rmExperiment() {
        for (let crl of this.experiment_data.controls) {
            crl.get('date')?.setValidators([])
            crl.get('img')?.setValidators([])
            crl.get('date')?.updateValueAndValidity()
            crl.get('img')?.updateValueAndValidity()
        }
    }

    addExperimentV() {
        for (let crl of this.experiment_data.controls) {
            crl.get('date')?.setValidators([Validators.required])
            crl.get('img')?.setValidators([Validators.required])
            crl.get('date')?.updateValueAndValidity()
            crl.get('img')?.updateValueAndValidity()
        }
    }

    experimentUrls: any[] = [];
    experimentSelectImages: any[] = [];

    handleExperimentFileInputChange(file: any, index: number): void {
        if (file.length) {
            for (let i = 0; i < file.length; i++) {
                const f = file[i];
                this.experimentSelectImages.push(f)
                let reader = new FileReader()
                reader.onload = (e: any) => {
                    let data = {
                        name: f.name,
                        url: e.target.result
                    }
                    this.experimentUrls.push(data)
                }
                reader.readAsDataURL(f)
            }
            this.experiment_data.controls[index].get('img')?.patchValue(this.experimentSelectImages);
        }
    }

    deleteExperimentImage(name: any, index: number) {
        this.experimentSelectImages = this.experimentSelectImages.filter(item => item.name != name)
        this.experimentUrls = this.experimentUrls.filter(item => item.name != name)
        if (this.experimentSelectImages.length) {
            this.experiment_data.controls[index].get('img')?.patchValue(this.experimentSelectImages);
        } else {
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
    guarantySelectImages: any[] = [];

    handleGuarantyFileInputChange(file: any, index: number): void {
        if (file.length) {
            for (let i = 0; i < file.length; i++) {
                const f = file[i];
                this.guarantySelectImages.push(f)
                let reader = new FileReader()
                reader.onload = (e: any) => {
                    let data = {
                        name: f.name,
                        url: e.target.result
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

    deleteGuarantyImage(name: any, index: number) {
        this.guarantySelectImages = this.guarantySelectImages.filter(item => item.name != name)
        this.guarantyUrls = this.guarantyUrls.filter(item => item.name != name)
        if (this.guarantySelectImages.length) {
            this.guaranty_data.controls[index].get('img')?.patchValue(this.guarantySelectImages);
        } else {
            this.guaranty_data.controls[index].get('img')?.patchValue("");
        }

    }


    userUrls: any[] = [];
    userSelectImages: any[] = [];

    handleUserFileInputChange(file: any): void {
        if (file.length) {
            for (let i = 0; i < file.length; i++) {
                const f = file[i];
                this.userSelectImages.push(f)
                let reader = new FileReader()
                reader.onload = (e: any) => {
                    let data = {
                        name: f.name,
                        url: e.target.result
                    }
                    this.userUrls.push(data)
                }
                reader.readAsDataURL(f)
            }
            this.person.get('user_img')?.patchValue(this.userSelectImages);
        }
        // else {
        //     this.experiment_data.controls[index].get('img')?.patchValue("");
        // }
    }

    deleteUserImage(name: any) {
        this.userSelectImages = this.userSelectImages.filter(item => item.name != name)
        this.userUrls = this.userUrls.filter(item => item.name != name)
        if (this.userSelectImages.length) {
            this.person.get('user_img')?.patchValue(this.userSelectImages);
        } else {
            this.person.get('user_img')?.patchValue("");
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


    test(value?: any) {
        console.log(this.date.convertLocalToNum(this.job.value.increaseSalary))
        console.log(value)
        /*		const formData = new FormData();
                formData.append('date', value.value.data[0].date)
                formData.append("personal", "ali")
                for (let img of value.value.data[0].img)
                    formData.append("personal", img);
                console.log(value.value.data)
                console.log(formData.getAll("value"))
                this.http.test(formData).pipe(
                    tap((data) => {
                        console.log(data)
                    })
                ).subscribe({
                    error: (err) => {
                        console.log(err)
                    }
                })*/
    }


}
