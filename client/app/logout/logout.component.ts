import { Component, OnInit } from '@angular/core';
import { AuthService, AppGlobals } from '../shared/services';

import { AuthService as AuthService2 } from 'angularx-social-login';
@Component({
  selector: 'app-logout',
  template: '',
  styles: ['']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService, private appGlobals: AppGlobals,
    private socialAuthService: AuthService2) { }

  ngOnInit() {
    this.auth.logout();
    this.appGlobals.userInfo = {};
    this.socialAuthService.signOut();
  }

}
