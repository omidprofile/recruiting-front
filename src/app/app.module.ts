import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { AuthComponent } from './auth/auth.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './panel/pages/dashboard/dashboard.component';
import { LoginComponent } from "./auth/login/login.component";
import { NgOptimizedImage } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from './panel/components/header/header.component';
import { MaterialModule } from "./material/material.module";
import { SidebarComponent } from './panel/components/sidebar/sidebar.component';
import { SidenavComponent } from './panel/components/sidenav/sidenav.component';
import { Sidenav_model } from "./panel/sidenav_model";
import { MatExpansionModule } from "@angular/material/expansion";
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { PersonalFormComponent } from './shared/personal-form/personal-form.component';
import { PersianNumberPipe } from './shared/pipe/persian-number.pipe';
import { Info3Component } from "./panel/pages/profile/info3/info3.component";
import { MatBadgeModule } from "@angular/material/badge";
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MapService } from "./services/http-services/map.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { DashboardCardComponent } from './shared/dashboard-card/dashboard-card.component';
import { UsersComponent } from './panel/pages/users/users.component';
import { UsersListComponent } from './panel/pages/users/users-list/users-list.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SearchTablePipe } from './shared/pipe/search-table.pipe';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { EmployeeFormComponent } from './shared/employee-form/employee-form.component';
import { MatRadioModule } from "@angular/material/radio";
import { MatStepperModule } from "@angular/material/stepper";
import { UserCreateComponent } from './panel/pages/users/user-create/user-create.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { RolesComponent } from './panel/pages/users/roles/roles.component';
import { AttendanceComponent } from './panel/pages/attendance/attendance.component';
import { DailyComponent } from './panel/pages/attendance/daily/daily.component';
import { AcceptComponent } from './shared/dialog/accept/accept.component';
import { EditLogComponent } from './shared/dialog/edit-log/edit-log.component';
import { ConflictComponent } from './panel/pages/attendance/conflict/conflict.component';
import { AttendanceTableComponent } from './shared/attendance-table/attendance-table.component';
import { PendingComponent } from './panel/pages/attendance/pending/pending.component';
import { AcceptedComponent } from './panel/pages/attendance/accepted/accepted.component';
import { DevicesComponent } from './panel/pages/attendance/devices/devices.component';
import { CreateDeviceComponent } from './shared/dialog/create-device/create-device.component';
import { BillComponent } from './panel/pages/bill/bill.component';
import { WorkReportComponent } from './panel/pages/bill/work-report/work-report.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { RoleFormComponent } from './shared/role-form/role-form.component';
import { SuccessComponent } from './shared/snackbar/success/success.component';
import { EnglishNumberPipe } from './shared/pipe/english-number.pipe';
import { SetTokenInterceptor } from "./interceptor/set-token.interceptor";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { ManualComponent } from './panel/pages/attendance/manual/manual.component';
import { ConflictDialogComponent } from './shared/dialog/conflict-dialog/conflict-dialog.component';
import { BaseSalary } from "./shared/dialog/create-baseSalary/base-salary.component";
import { CreateShiftComponent } from './shared/dialog/create-shift/create-shift.component';


@NgModule({
	declarations: [
		AppComponent,
		PanelComponent,
		AuthComponent,
		LoginComponent,
		HomeComponent,
		DashboardComponent,
		ErrorComponent,
		HeaderComponent,
		SidebarComponent,
		SidenavComponent,
		SnackbarComponent,
		PersonalFormComponent,
		PersianNumberPipe,
		Info3Component,
		TestComponent,
		DashboardCardComponent,
		UsersComponent,
		UsersListComponent,
		SearchTablePipe,
		PaginatorComponent,
		EmployeeFormComponent,
		UserCreateComponent,
		RolesComponent,
		AttendanceComponent,
		DailyComponent,
		AcceptComponent,
		EditLogComponent,
		ConflictComponent,
  AttendanceTableComponent,
  PendingComponent,
  AcceptedComponent,
  DevicesComponent,
  CreateDeviceComponent,
  BillComponent,
  WorkReportComponent,
  RoleFormComponent,
  SuccessComponent,
  EnglishNumberPipe,
  ManualComponent,
  ConflictDialogComponent,
	BaseSalary,
 CreateShiftComponent
	],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        NgOptimizedImage,
        BrowserAnimationsModule,
        MaterialModule,
        MatExpansionModule,
        MatBadgeModule,
        FormsModule,
        HttpClientModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatStepperModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatAutocompleteModule,
    ],
	providers: [
		{
			provide:HTTP_INTERCEPTORS,
			useClass:SetTokenInterceptor,
			multi:true
		},
		Sidenav_model,
		MapService,
		MatDatepickerModule,
		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
		JwtHelperService
	],
	exports: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
