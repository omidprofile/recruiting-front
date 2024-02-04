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
import { EmployeeComponent } from './panel/pages/users/employee/employee.component';
import { IdentityComponent } from './shared/forms/identity/identity.component';
import { GlobalErrorHandlerInterceptor } from "./interceptor/global-error-handler.interceptor";
import { InsuranceComponent } from './shared/dialog/insurance/insurance.component';
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { ReportMakerComponent } from './panel/pages/bill/report-maker/report-maker.component';
import { ReportsComponent } from './panel/pages/bill/reports/reports.component';
import { AttendanceInfoComponent } from './panel/pages/bill/attendance-info/attendance-info.component';
import { PersianCurrencyPipe } from "./shared/pipe/persian-currency.pipe";
import { PaySlipComponent } from './panel/pages/bill/pay-slip/pay-slip.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { CalendarComponent } from './panel/pages/calendar/calendar.component';
import { UsercreatedComponent } from './shared/dialog/usercreated/usercreated.component';
import { MonthComponent } from './shared/dialog/month/month.component';
import { YearComponent } from './shared/dialog/year/year.component';
import { DayEventsComponent } from './shared/dialog/day-events/day-events.component';
import { DayStatusChangeComponent } from './shared/dialog/day-status-change/day-status-change.component';
import { DayCreateEventComponent } from './shared/dialog/day-create-event/day-create-event.component';
import { PrintComponent } from './print/print.component';
import { GeneralReportComponent } from './print/general-report/general-report.component';
import { InfoComponent } from './panel/pages/users/info/info.component';
import { EditStringComponent } from './shared/dialog/editUser/edit-string/edit-string.component';
import { EditNumberComponent } from './shared/dialog/editUser/edit-number/edit-number.component';
import { EditSelectComponent } from './shared/dialog/editUser/edit-select/edit-select.component';
import { ChangeJobComponent } from './shared/dialog/change-job/change-job.component';
import { JobInfoComponent } from './shared/dialog/job-info/job-info.component';
import { ChangeAvatarComponent } from './shared/dialog/change-avatar/change-avatar.component';
import { ManualAttendanceComponent } from './shared/dialog/manual-attendance/manual-attendance.component';


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
		PersianCurrencyPipe,
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
 CreateShiftComponent,
 EmployeeComponent,
 IdentityComponent,
 InsuranceComponent,
 ReportMakerComponent,
 ReportsComponent,
 AttendanceInfoComponent,
 PaySlipComponent,
 BreadcrumbComponent,
 CalendarComponent,
 UsercreatedComponent,
 MonthComponent,
 YearComponent,
 DayEventsComponent,
 DayStatusChangeComponent,
 DayCreateEventComponent,
 PrintComponent,
 GeneralReportComponent,
 InfoComponent,
 EditStringComponent,
 EditNumberComponent,
 EditSelectComponent,
 ChangeJobComponent,
 JobInfoComponent,
 ChangeAvatarComponent,
 ManualAttendanceComponent,
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
		CdkDropList,
		CdkDrag,
	],
	providers: [
		{
			provide:HTTP_INTERCEPTORS,
			useClass:GlobalErrorHandlerInterceptor,
			multi:true
		},
		{
			provide:HTTP_INTERCEPTORS,
			useClass:SetTokenInterceptor,
			multi:true
		},
		Sidenav_model,
		MapService,
		MatDatepickerModule,
		EnglishNumberPipe,
		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
		JwtHelperService
	],
	exports: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
