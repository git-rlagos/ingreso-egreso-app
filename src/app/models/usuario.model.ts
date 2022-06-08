export class Usuario {
  /* Forma corta de crear un modelo en typescript */
  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ){}
}
