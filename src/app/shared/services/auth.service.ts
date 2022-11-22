import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import   firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';


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
 
      let user = result.user;
      if(!user) return;

      this.userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl')!;
      if(!returnUrl) return;
      
        localStorage.removeItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      // ...
    }).catch((error) => {
   
    });
  }

  async logout(){
    console.log("logging out")
    await this.aFAuth.signOut();
  }

  get appUser$():Observable<AppUser>{
    return  this.user$.pipe(
      switchMap(user=>{
        if(user?.uid! == null || user?.uid! == undefined) { console.log("The user is undefined "+user?.uid!);
         }
        return this.userService.get(user?.uid!) as Observable<AppUser> ;
      })
      )
  }
}
