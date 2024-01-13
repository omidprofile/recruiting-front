import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "./auth/auth.component";
import { ErrorComponent } from "./error/error.component";
import { LoginComponent } from "./auth/login/login.component";
import { PanelComponent } from "./panel/panel.component";
import { DashboardComponent } from "./panel/pages/dashboard/dashboard.component";
import { Info3Component } from "./panel/pages/profile/info3/info3.component";
import { TestComponent } from "./test/test.component";
import { UsersComponent } from "./panel/pages/users/users.component";
import { UsersListComponent } from "./panel/pages/users/users-list/users-list.component";
import { UserCreateComponent } from "./panel/pages/users/user-create/user-create.component";
import { RolesComponent } from "./panel/pages/users/roles/roles.component";
import { AttendanceComponent } from "./panel/pages/attendance/attendance.component";
import { DailyComponent } from "./panel/pages/attendance/daily/daily.component";
import { ConflictComponent } from "./panel/pages/attendance/conflict/conflict.component";
import { PendingComponent } from "./panel/pages/attendance/pending/pending.component";
import { AcceptComponent } from "./shared/dialog/accept/accept.component";
import { AcceptedComponent } from "./panel/pages/attendance/accepted/accepted.component";
import { DevicesComponent } from "./panel/pages/attendance/devices/devices.component";
import { BillComponent } from "./panel/pages/bill/bill.component";
import { WorkReportComponent } from "./panel/pages/bill/work-report/work-report.component";
import { checkTokenGuard } from "./guard/check-token.guard";
import { accessGuard } from "./guard/access.guard";
import { ManualComponent } from "./panel/pages/attendance/manual/manual.component";
import { EmployeeComponent } from "./panel/pages/users/employee/employee.component";
import { getTokenGuard } from "./guard/get-token.guard";
import { ReportMakerComponent } from "./panel/pages/bill/report-maker/report-maker.component";
import { ReportsComponent } from "./panel/pages/bill/reports/reports.component";
import { AttendanceInfoComponent } from "./panel/pages/bill/attendance-info/attendance-info.component";
import { PaySlipComponent } from "./panel/pages/bill/pay-slip/pay-slip.component";
import { CalendarComponent } from "./panel/pages/calendar/calendar.component";

const routes: Routes = [
	
	// Home :
	{path: '', redirectTo: '/panel', pathMatch: 'full'},
	
	// Auth :
	{
		path: 'auth', component: AuthComponent,
		children: [
			{path: '', redirectTo: 'login', pathMatch: 'full'},
			{path: 'login', component: LoginComponent, canActivate: [getTokenGuard]},
		]
	},
	
	// Panel :
	{
		path: 'panel', component: PanelComponent,
		canActivateChild: [checkTokenGuard],
		data:{title:'داشبورد'},
		children: [
			{path: 'test', component: TestComponent},
			{
				path: '', component: DashboardComponent,
				pathMatch: 'full',
				// canActivate:[accessGuard]
			},
			/*calendar*/
			{path: 'calendar',component: CalendarComponent},
			/*users route*/
			{
				path: 'users', component: UsersComponent,
				data: {permission: ['super-user', 'recruiting-admin',], title:'کاربران'},
				canActivate:[accessGuard]
			},
			{
				path: 'users/list', component: UsersListComponent,
				data: {permission: ['super-user', 'recruiting-admin',],title:'لیست کاربران'},
				canActivate:[accessGuard]
			},
			{
				path: 'users/create', component: UserCreateComponent,
				data: {permission: ['super-user', 'recruiting-admin',],title:'افزودن نیرو'},
				canActivate:[accessGuard]
			},
			{
				path: 'users/roles', component: RolesComponent,
				data: {permission: ['super-user', 'recruiting-admin',],title:'نقش ها'},
				canActivate:[accessGuard]
			},
			{
				path: 'users/employee', component: EmployeeComponent,
				data: {permission: ['super-user', 'recruiting-admin',]},
				canActivate:[accessGuard]
			},
			/*attendance route*/
			{path: 'attendance', component: AttendanceComponent},
			{path: 'attendance/daily', component: DailyComponent},
			{path: 'attendance/manual', component: ManualComponent},
			{path: 'attendance/conflict', component: ConflictComponent},
			{path: 'attendance/pending', component: PendingComponent},
			{path: 'attendance/accepted', component: AcceptedComponent},
			{path: 'attendance/devices', component: DevicesComponent},
			/*bill routes*/
			{path: 'report', component: BillComponent},
			{path: 'report/workReport', component: WorkReportComponent},
			{path: 'report/reportMaker', component: ReportMakerComponent},
			{path: 'report/reports', component: ReportsComponent},
			{path: 'report/workInfo', component: AttendanceInfoComponent},
			{path: 'report/paySlip', component: PaySlipComponent},
			/**/
			{path: 'user-info', component: Info3Component},
		]
	},
	
	{path: '**', component: ErrorComponent, data: {errorCode: 404}},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {enableTracing: false})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
