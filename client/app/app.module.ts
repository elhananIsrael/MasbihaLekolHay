import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { MatMenuModule} from '@angular/material/menu';

import { MaterialModule } from './shared/modules';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { PostService } from './services/post.service';

import {
  UserService, AuthService,
  AuthGuardLogin, AuthGuardAdmin,
  AppGlobals, BaseService
} from './shared/services';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChatComponent } from './chat/chat.component';


import { SocialLoginModule, AuthServiceConfig, LoginOpt } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { CatalogComponent } from './catalog/catalog.component';
import {MatGridListModule} from '@angular/material';
import { MyCartComponent } from './views/my-cart/my-cart.component';
import { NgChatModule } from 'ng-chat';
import { MyUploadsComponent } from './views/my-uploads/my-uploads.component';
import { BlogComponent } from './blog/blog.component';
import { CreatePostComponent } from './blog/create-post/create-post.component';
import { ViewPostComponent } from './blog/view-post/view-post.component';



//
const configChat: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


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
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    ChatComponent,
    MyUploadsComponent,
    BlogComponent,
    CreatePostComponent,
    ViewPostComponent,
    CatalogComponent,
    MyCartComponent
  ],
  imports: [  
    MatMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    JwtModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
    MatGridListModule,
    NgChatModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgChatModule,
    SocketIoModule.forRoot(configChat) 
    // import Social Login Module
  ],
  providers: [// all are singleton
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    AppGlobals,
    PostService,
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
