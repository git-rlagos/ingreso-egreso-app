export class IngresoEgreso {

    constructor(
        public descripcion: string,
        public monto: number,
        public tipo: string,
        public uid?: string    // ID de este documento, tiene que ser opcional porque el ID lo genera Firebase.

    ){}

}
