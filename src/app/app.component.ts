import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import {Firestore, addDoc, collection} from '@angular/fire/firestore';

import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
      public authService: AuthService
  ){
      this.authService.initAuthListener();
   }


 // items: Observable<any[]>;


  // constructor(firestore: AngularFirestore) {
  //   this.items = firestore.collection('items').valueChanges();
  // }


  title = 'ingresoEgresoApp';
}
