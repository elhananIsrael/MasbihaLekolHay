import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService, AppGlobals } from '../shared/services';
import { ToastComponent } from '../shared/toast/toast.component';

import { AuthService as AuthService2 } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public auth2: any; // auth

  loginForm: FormGroup;
  email = new FormControl('', [Validators.required,
  Validators.minLength(3),
  Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
  Validators.minLength(6)]);
  user: any;
  loggedIn: boolean;

  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private appGlobals: AppGlobals,
    private router: Router,
    public toast: ToastComponent,
    private socialAuthService: AuthService2) { }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      console.log('res', res);
      // send idToken to back end and update if email exist otherwise create new user
      // save token for login user.

      this.ApiCallback('/api/google_login', res);

    }).catch(err => { console.log(err); }
    );
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      // console.log(user);

    });

    if (this.auth.loggedIn) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }
  ApiCallback(apiUrl, userData) {
    this.auth.socialLogin(apiUrl, userData).subscribe((res: any) => {
      console.log('res:', res);
      this.toast.setMessage('you successfully loggedIn!', 'success');
      this.router.navigate(['/']);
      this.appGlobals.userInfo = res;
    }, (err) => {
      console.log('err:', err);
      this.toast.setMessage('something went wrong', 'danger');
      this.signOut();
      // this.alerts.push({ type: 'danger', msg: err['message'], 'timeout': 5000 })
    });
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => {
        this.router.navigate(['/']);
        this.appGlobals.userInfo = res;
      },
      error => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

}
