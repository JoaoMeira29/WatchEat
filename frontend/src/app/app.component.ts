import { Component, OnInit, Input } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "./_shared/services/_Auth/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showFooter: boolean | undefined;
  title = 'WatchEat';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.showFooter = true;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showFooter = !(this.hasRoute('login') || this.hasRoute('register'));
      }
    });
  }

  ngOnInit() {
    this.authService.IsUserLogged();
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
