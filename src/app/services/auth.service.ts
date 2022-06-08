import {
         Auth,
         authState,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut
} from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: Auth,
              public firestore: Firestore) { }

  initAuthListener(){
    return authState(this.auth).subscribe( fuser => {
      console.log( fuser );
      console.log( fuser?.uid );
      console.log( fuser?.email);
    });
  }

  crearUsuario(nombre: string, email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then(  ({ user }) => {
        // Creación de nueva instancia de usuario
        const newUser = new Usuario(user.uid, nombre, email);
        const userRef = collection(this.firestore, `user`);

        // Postear la información a Firebase
        return addDoc( userRef, {...newUser})

      }
    )
  }


  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth);
  }

  isAuth(){
    return authState(this.auth).pipe(
      map( fUser => fUser != null)
    );
  }


}
