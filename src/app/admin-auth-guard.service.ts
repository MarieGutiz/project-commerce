import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, ObservableInput, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService:UserService) { }

  canActivate():Observable<boolean>{
    
   const ver:Observable<boolean>= this.auth.appUser$.pipe(
     map((appUser):boolean =>{ 
      
       return appUser.isAdmin;
     }) 
    )
    return ver;

  }
}
