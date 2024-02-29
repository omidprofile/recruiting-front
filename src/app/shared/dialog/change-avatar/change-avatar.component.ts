import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ValidationFormService} from "../../../services/validation-form.service";
import {FormValidateService} from "../../../services/form-validate.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsersHttpService} from "../../../HttpServices/users-http.service";
import {SnackbarComponent} from "../../snackbar/snackbar.component";

@Component({
    selector: 'app-change-avatar',
    templateUrl: './change-avatar.component.html',
    styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent {
    newImage: any;
    newImageUrl: any;

    constructor(
        public dialogRef: MatDialogRef<ChangeAvatarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private validator: ValidationFormService,
        public validate: FormValidateService,
        private _snackBar: MatSnackBar,
        private httpUser: UsersHttpService,
        public dialog: MatDialog,) {

    }

    handleUserFileInputChange(file: any): void {
        if (file.length) {
            const f = file[0];
            this.newImage = f;
            let reader = new FileReader()
            reader.onload = (e: any) => {
                this.newImageUrl = {
                    name: f.name,
                    url: e.target.result
                }
            }
            reader.readAsDataURL(f)

        }
        // else {
        //     this.experiment_data.controls[index].get('img')?.patchValue("");
        // }
    }

    changeAvatar() {
        if (this.data.field == 'avatar') {
            let formData = new FormData();
            formData.append('id', this.data.id);
            formData.append('userImage', this.newImage);
            this.httpUser.updateAvatar(formData).subscribe({
                next: (data: any) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با موفقیت انجام شد`,
                        duration: 1000
                    });
                    this.dialogRef.close('success');
                },
                error: (err) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با خطا روبرو شد `,
                        duration: 1000
                    });
                }
            })
        }
        if (this.data.field == 'experiment') {
            let formData = new FormData();
            formData.append('id', this.data.employee_id);
            formData.append('index', this.data.index);
            formData.append('experiment', this.newImage);
            this.httpUser.addExperimentImg(formData).subscribe({
                next: (data: any) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با موفقیت انجام شد`,
                        duration: 1000
                    });
                    this.dialogRef.close('success');
                },
                error: (err) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با خطا روبرو شد `,
                        duration: 1000
                    });
                }
            })
        }
        if (this.data.field == 'guarantee') {
            let formData = new FormData();
            formData.append('id', this.data.employee_id);
            formData.append('index', this.data.index);
            formData.append('guarantee', this.newImage);
            this.httpUser.addGuaranteeImg(formData).subscribe({
                next: (data: any) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با موفقیت انجام شد`,
                        duration: 1000
                    });
                    this.dialogRef.close('success');
                },
                error: (err) => {
                    this._snackBar.openFromComponent(SnackbarComponent, {
                        data: `ویرایش با خطا روبرو شد `,
                        duration: 1000
                    });
                }
            })
        }
    }

}
