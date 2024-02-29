import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ValidationFormService} from "../../../services/validation-form.service";
import {FormValidateService} from "../../../services/form-validate.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsersHttpService} from "../../../HttpServices/users-http.service";
import {SnackbarComponent} from "../../snackbar/snackbar.component";

@Component({
    selector: 'app-delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private validator: ValidationFormService,
        public validate: FormValidateService,
        private _snackBar: MatSnackBar,
        private http: UsersHttpService) {
    }

    submit() {
        let data: any = {}
        if (this.data.field.includes('mobile')) {
            data = {
                index: this.data.index
            }

            this.http.updateMobile({
                id: this.data.id,
                data: data
            }).subscribe({
                next: (data) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با موفقیت انجام شد`,
                        duration: 1000
                    })
                    this.dialogRef.close('success')
                },
                error: (error) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با خطا مواجه شد`,
                        duration: 1000
                    })
                    console.log(error)
                }
            })
        }
        if (this.data.field.includes('phone')) {
            data = {
                index: this.data.index
            }
            this.http.updatePhone({
                id: this.data.id,
                data: data
            }).subscribe({
                next: (data) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با موفقیت انجام شد`,
                        duration: 1000
                    })
                    this.dialogRef.close('success')
                },
                error: (error) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با خطا مواجه شد`,
                        duration: 1000
                    })
                    console.log(error)
                }
            })
        }
        if (this.data.field.includes('email')) {
            data = {
                index: this.data.index
            }
            this.http.updateEmail({
                id: this.data.id,
                data: data
            }).subscribe({
                next: (data) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با موفقیت انجام شد`,
                        duration: 1000
                    })
                    this.dialogRef.close('success')
                },
                error: (error) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با خطا مواجه شد`,
                        duration: 1000
                    })
                    console.log(error)
                }
            })
        }
        if (this.data.field.includes('experiment')) {
            data = {
                index: this.data.index,
                imgIndex:this.data.element.imgIndex
            }
            this.http.rmExperimentImg({
                id: this.data.element.Employee_id,
                data: data
            }).subscribe({
                next: (data) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با موفقیت انجام شد`,
                        duration: 1000
                    })
                    this.dialogRef.close('success')
                },
                error: (error) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با خطا مواجه شد`,
                        duration: 1000
                    })
                    console.log(error)
                }
            })
        }

        if (this.data.field.includes('guarantee')) {
            data = {
                index: this.data.index,
                imgIndex:this.data.element.imgIndex
            }
            this.http.rmGuaranteeImg({
                id: this.data.element.Employee_id,
                data: data
            }).subscribe({
                next: (data) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با موفقیت انجام شد`,
                        duration: 1000
                    })
                    this.dialogRef.close('success')
                },
                error: (error) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با خطا مواجه شد`,
                        duration: 1000
                    })
                    console.log(error)
                }
            })
        }
    }

}


