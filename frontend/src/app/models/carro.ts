
export class Carro {
    constructor(id_usuario= null,
        id_carrito= null,
        comprado = false) {
            this.id_usuario = id_usuario;
            this.id_carrito = id_carrito;
            this.comprado = comprado;
        }
    id_usuario: number;
    id_carrito: number;
    comprado: boolean;
}
