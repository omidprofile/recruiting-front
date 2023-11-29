import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {ErrorComponent} from "./error/error.component";
import {LoginComponent} from "./auth/login/login.component";
import {PanelComponent} from "./panel/panel.component";
import {DashboardComponent} from "./panel/pages/dashboard/dashboard.component";
import {Info3Component} from "./panel/pages/profile/info3/info3.component";
import {TestComponent} from "./test/test.component";
import {UsersComponent} from "./panel/pages/users/users.component";
import {UsersListComponent} from "./panel/pages/users/users-list/users-list.component";
import {UserCreateComponent} from "./panel/pages/users/user-create/user-create.component";
import {RolesComponent} from "./panel/pages/users/roles/roles.component";
import { AttendanceComponent } from "./panel/pages/attendance/attendance.component";
import { DailyComponent } from "./panel/pages/attendance/daily/daily.component";
import { ConflictComponent } from "./panel/pages/attendance/conflict/conflict.component";
import { PendingComponent } from "./panel/pages/attendance/pending/pending.component";
import { AcceptComponent } from "./shared/dialog/accept/accept.component";
import { AcceptedComponent } from "./panel/pages/attendance/accepted/accepted.component";
import { DevicesComponent } from "./panel/pages/attendance/devices/devices.component";
import { BillComponent } from "./panel/pages/bill/bill.component";
import { WorkReportComponent } from "./panel/pages/bill/work-report/work-report.component";

const routes: Routes = [

    // Home :
    {path: '', redirectTo: '/panel', pathMatch: 'full'},

    // Auth :
    {
        path: 'auth', component: AuthComponent,
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', component: LoginComponent},
        ]
    },

    // Panel :
    {
        path: 'panel', component: PanelComponent,
        children: [
            {path: 'test', component: TestComponent},
            {path: '', component: DashboardComponent, pathMatch: 'full'},
            /*users route*/
			{path: 'users', component: UsersComponent},
			{path: 'users/list', component: UsersListComponent},
			{path: 'users/create', component: UserCreateComponent},
			{path: 'users/roles', component: RolesComponent},
            /*attendance route*/
            {path: 'attendance', component: AttendanceComponent},
            {path: 'attendance/daily', component: DailyComponent},
            {path: 'attendance/conflict', component: ConflictComponent},
            {path: 'attendance/pending', component: PendingComponent},
            {path: 'attendance/accepted', component: AcceptedComponent},
            {path: 'attendance/devices', component: DevicesComponent},
            /*bill routes*/
            {path: 'bill', component: BillComponent},
            {path: 'bill/workReport', component: WorkReportComponent},
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
