import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './shared/modules';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AttendanceService } from './attendances/attendance.service';
import { EmployeeService } from './employee/employee.service';
import {
  UserService, AuthService,
  AuthGuardLogin, AuthGuardAdmin,
  AppGlobals, BaseService
} from './shared/services';

import { AppComponent } from './app.component';
import { AttendancesComponent } from './attendances/attendances.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeeComponent } from './employee/employee.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';

import { SocialLoginModule, AuthServiceConfig, LoginOpt } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { CatalogComponent } from './catalog/catalog.component';


// Configs

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('491617855106-ds9mf0jkasddogoc3o4tm2mhioqv7hh2.apps.googleusercontent.com', googleLoginOptions)
  },

]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    AttendancesComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    EmployeeComponent,
    AttendanceReportComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    JwtModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule // import Social Login Module
  ],
  providers: [// all are singleton
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    AttendanceService,
    UserService,
    EmployeeService,
    AppGlobals,
    BaseService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
