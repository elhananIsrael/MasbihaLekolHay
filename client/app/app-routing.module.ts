import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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
import { CatalogComponent} from './catalog/catalog.component';
import { MyCartComponent} from './views/my-cart/my-cart.component';
import { ChatComponent } from './chat/chat.component';
import { MyUploadsComponent } from './views/my-uploads/my-uploads.component';
import { BlogComponent } from './blog/blog.component'
import { CreatePostComponent } from './blog/create-post/create-post.component';
import { ViewPostComponent } from './blog/view-post/view-post.component';

import { AuthGuardLogin, AuthGuardAdmin } from './shared/services';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'attendances', component: AttendancesComponent },
  { path: 'attendanceReport', component: AttendanceReportComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  {path: 'catalog', component: CatalogComponent},
  {path: 'my-cart', component: MyCartComponent},
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuardLogin] },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuardLogin] },
  {path: 'create-post', component: CreatePostComponent},
  {path: 'view-post', component: ViewPostComponent},
  {path: 'my-uploads', component: MyUploadsComponent},
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
