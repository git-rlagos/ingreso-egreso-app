// import 'firebase/firestore';
import * as ioActions from '../ingreso-egreso/ingreso-egreso.actions';

import { Firestore, Unsubscribe, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from '@angular/fire/firestore';

import { AppState } from '../app.reducers';
import { AuthService } from './auth.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  unsubscribe!: Unsubscribe;

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private store: Store<AppState>) {
  }

  // https://firebase.google.com/docs/firestore/quickstart?authuser=4&hl=es
  async crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const userUID = this.authService.user?.uid;
    // Agrega un documento a una subcolección
    return await addDoc(
      collection(this.firestore, "usuario", userUID!, "ingreso-egreso"), { ...ingresoEgreso });
  }


  initIngresosEgresosListener(uid: string) {
    const ingresosEgresosRef = collection(this.firestore, "usuario", uid, "ingreso-egreso");
    const queryIngresosEgresos = query(ingresosEgresosRef, orderBy("descripcion", "asc"));
    this.unsubscribe = onSnapshot(queryIngresosEgresos, (snapshot) => {
      const resultado = snapshot.docs.map(d => {
        const {descripcion, monto, tipo} = d.data();
        return {uid: d.id, descripcion, monto, tipo};
      });

      this.store.dispatch(ioActions.setItems({items: resultado}));
    });
  }

  unsubscribeIngresosEgresosListener(){
    if(this.unsubscribe) this.unsubscribe();
  }

  borrarItem(uid: string){
    const userUID = this.authService.user?.uid;
    return deleteDoc(doc(this.firestore, "usuario", userUID!, "ingreso-egreso", uid));
  }


  /* Navegar en Subcolecciones en Firestore v9 */
  /* https://stackoverflow.com/questions/69286935/how-to-get-a-subcollection-inside-a-collection-in-firestore-web-version-9-modul */

}
