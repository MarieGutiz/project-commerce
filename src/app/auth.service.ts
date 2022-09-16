import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Route, Router } from '@angular/router';
import   firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$!: Observable<firebase.User | null>;
  
  
  constructor(private userService: UserService,
              private aFAuth:AngularFireAuth,
              private route: ActivatedRoute,
              private router:Router) { 
    this.user$ = aFAuth.authState;
  }

  login(){
   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
   localStorage.setItem('returnUrl', returnUrl);

// this.aFAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    const provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
 
      var user = result.user;
      if(user){
        this.userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl')!;
        this.router.navigateByUrl(returnUrl);
      }
      // ...
    }).catch((error) => {
   
    });
  }

  logout(){
    console.log("logging out")
    this.aFAuth.signOut();
  }

  get appUser$():Observable<AppUser>{
    return  this.user$.pipe(
      switchMap(user=>{
        return this.userService.get(user?.uid!) as Observable<AppUser> ;
      })
      )
  }
}
