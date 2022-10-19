import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class RootGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private readonly supabase: SupabaseService
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.isLoggedIn();
  }
  
  async isLoggedIn():Promise<true|UrlTree> {
    if (await this.supabase.session)
    {
      return true;
    }
    alert("You must be logged in to access this page, redirecting to the login page");
    return this.router.parseUrl('/auth');
  };  
}
