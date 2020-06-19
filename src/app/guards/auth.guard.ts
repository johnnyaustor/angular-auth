import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    let isLogin = this.authService.isLogin();

    if (isLogin) {
      return isLogin;
    }

    localStorage.clear();
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })

    return !isLogin;
  }

}
