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
			{path: 'users', component: UsersComponent},
			{path: 'users/list', component: UsersListComponent},
			{path: 'users/create', component: UserCreateComponent},
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
