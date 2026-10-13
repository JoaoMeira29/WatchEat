import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import decode from 'jwt-decode';
import { AuthService } from './auth.service';

// Lets a page be opened only by the roles listed in the route's data, for example
// { path: 'add-content', canActivate: [RoleGuard], data: { roles: ['Admin'] } }.
// This only hides pages: the API checks the role again on every request.
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.IsUserLogged()) {
      this.router.navigate(['/login']);
      return false;
    }

    const roles: string[] = route.data['roles'] ?? [];
    const tokenPayload = decode(localStorage.getItem('token') as string) as any;
    if (roles.includes(tokenPayload?.user?.[0]?.Utilizador_Roles)) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
