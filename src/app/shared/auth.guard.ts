import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService, ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['login'])
    }
    let roles = next.data["roles"] as Array<string>;
    if (roles) {
      return this.userService.roleCheck(roles);
    }
    return this.userService.isLoggedIn;
  }
}
