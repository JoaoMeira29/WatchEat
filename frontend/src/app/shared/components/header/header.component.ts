import {Component, OnInit, Input, HostListener, ElementRef} from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import decode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: {
    "(window:click)": "onClick()"
  }
})
export class HeaderComponent {
  isOpen = false;
  isOpenMobile = false;
  isUserLogged = false;
  currentUser : any = null;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.IsUserLogged();
    // Visitors who are not logged in have no token to read
    const token = localStorage.getItem('token');
    if (this.isUserLogged && token) {
      const tokenPayload = decode(token) as any;
      this.currentUser = tokenPayload.user[0];
    }
  }

  IsUserLogged(): void {
    this.isUserLogged = this.authService.IsUserLogged();
  }
  LogoutUser(): void {
    this.currentUser = null;
    this.authService.LogoutUser();
  }

  toggleMenu(event : any) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  toggleMenuMobile() {
    this.isOpenMobile = !this.isOpenMobile;
  }
  closeMenu() {
    this.isOpen = false;
  }
  onClick() {
    this.isOpen = false;
  }
}
