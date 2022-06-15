import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore";

export class Usuario {

  /* Obtener una nueva instancia de la clase Usuario */
  static fromFirebase({email, nombre, uid} : UsuarioType){
    return new Usuario(uid, nombre, email);
  }

  /* Forma corta de crear un modelo en typescript */
  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ){}
}

/* Tipo que permite usar desestructuración de objeto en clase Usuario */
export type UsuarioType = {
  email: string,
  nombre: string,
  uid: string
}


// Firestore data converter
export const UsuarioConverter = {
  toFirestore: (user: { email: string; nombre: string; uid: string; }) => {
      return {
          email: user.email,
          nombre: user.nombre,
          uid: user.uid
          };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>,
                  options: SnapshotOptions) => {
      const data = snapshot.data(options);
      return new Usuario(data['uid'], data['nombre'], data['email']);
  }
};
