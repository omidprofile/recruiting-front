import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PanelComponent} from './panel/panel.component';
import {AuthComponent} from './auth/auth.component';
import {ErrorComponent} from './error/error.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './panel/pages/dashboard/dashboard.component';
import {LoginComponent} from "./auth/login/login.component";
import {NgOptimizedImage} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from './panel/components/header/header.component';
import {MaterialModule} from "./material/material.module";
import {SidebarComponent} from './panel/components/sidebar/sidebar.component';
import {SidenavComponent} from './panel/components/sidenav/sidenav.component';
import {Sidenav_model} from "./panel/sidenav_model";
import {MatExpansionModule} from "@angular/material/expansion";
import {SnackbarComponent} from './shared/snackbar/snackbar.component';
import {PersonalFormComponent} from './shared/personal-form/personal-form.component';
import {PersianNumberPipe} from './shared/pipe/persian-number.pipe';
import {Info3Component} from "./panel/pages/profile/info3/info3.component";
import {MatBadgeModule} from "@angular/material/badge";
import {TestComponent} from './test/test.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MapService} from "./services/http-services/map.service";
import {HttpClientModule} from "@angular/common/http";
import { DashboardCardComponent } from './shared/dashboard-card/dashboard-card.component';
import { UsersComponent } from './panel/pages/users/users.component';
import { UsersListComponent } from './panel/pages/users/users-list/users-list.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import { SearchTablePipe } from './shared/pipe/search-table.pipe';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { EmployeeFormComponent } from './shared/employee-form/employee-form.component';
import {MatRadioModule} from "@angular/material/radio";
import { MatStepperModule } from "@angular/material/stepper";
import { UserCreateComponent } from './panel/pages/users/user-create/user-create.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";







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
    ],
  providers: [Sidenav_model,
    MapService,
  MatDatepickerModule],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
