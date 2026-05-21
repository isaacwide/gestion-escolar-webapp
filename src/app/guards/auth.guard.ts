import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthServices } from '../servicies/auth-services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthServices,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getSessionToken();
    if (!token || token === '') {
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['roles'] as string[] | undefined;
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    const userGroup = this.authService.getUserGroup();
    if (allowedRoles.includes(userGroup)) {
      return true;
    }

    const fallbackRoute = this.getFallbackRoute();
    this.router.navigate([fallbackRoute]);
    return false;
  }

  private getFallbackRoute(): string {
    if (this.authService.isAdmin()) {
      return '/administrador';
    }
    if (this.authService.isTeacher()) {
      return '/maestros';
    }
    return '/alumnos';
  }
}