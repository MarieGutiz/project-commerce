import { Injectable } from '@angular/core';
import   firebase from 'firebase/app';
import "firebase/database";
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) { }

  save(user : firebase.User){
    console.log("save user db"); 
        this.db.object('/users/'+ user.uid).update({
          name:  user.displayName,
          email: user.email
        });
  }

  get(uid:string):Observable<unknown>{
    return this.db.object('/users/'+uid).valueChanges();
  }
}
