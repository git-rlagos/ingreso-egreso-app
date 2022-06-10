import * as authActions from '../auth/auth.actions';

import {
         Auth,
         authState,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut
} from '@angular/fire/auth';
import { Firestore, Unsubscribe, addDoc, collection, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { Subscription, map } from 'rxjs';
import { Usuario, UsuarioConverter, UsuarioType } from '../models/usuario.model';

import { AppState } from '../app.reducers';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  unsubscribe!: Unsubscribe;

  constructor(public auth: Auth,
              public firestore: Firestore,
              private store: Store<AppState>) { }

  initAuthListener(){
    return authState(this.auth).subscribe( fuser => {
      if(fuser){  // fuser tiene información parcial del usuario pero no el nombre.
        // Por lo que debemos consultar a firestore por el documento para obtener el nombre:
        this.unsubscribe = onSnapshot(doc(this.firestore, "usuario", fuser.uid)
                                      .withConverter(UsuarioConverter),
          (doc) => {
          // Respond to data
          if(doc.exists()){
            console.log("Current data: ", doc.data());
            const usuario = doc.data();
            this.store.dispatch( authActions.setUser({user: usuario}) );
          }else{
            console.log("No such document!");
            this.store.dispatch( authActions.unSetUser());
          }

        });
      }else{
        if(this.unsubscribe) this.unsubscribe(); // Stop listening to changes
        this.store.dispatch( authActions.unSetUser());
      }

    });
  }

  crearUsuario(nombre: string, email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then(  async ({ user }) => {
        // Creación de nueva instancia de usuario
        const newUser = new Usuario(user.uid, nombre, email);
        // const userRef = collection(this.firestore, `usuario`);

        // Postear la información a Firebase
        // return addDoc( userRef, {...newUser})
         // Add a new document in collection "cities"
         return await setDoc(doc(this.firestore, "usuario", user.uid), {...newUser});
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
