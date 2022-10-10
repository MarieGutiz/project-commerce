import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser!:AppUser
  toggleBtn:boolean =false;
  constructor(private auth:AuthService) { 
    auth.appUser$.subscribe(user=> this.appUser =user)
  }


  logout(){
   this.auth.logout();
  }
  toggle(){
    this.toggleBtn = !this.toggleBtn;
  }
}
