import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    return this.authService.user$.pipe(
      map((user): boolean =>{
          if(user) return true;
    
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }))

    
  

    // ( user =>{
    //   if(user) return true;

    //   this.router.navigate(['/login']);
    //   return false;
    // })
  }
}
