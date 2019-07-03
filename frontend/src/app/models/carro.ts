
export class Carro {
    constructor(id_carro= null,
        id_usuario= null,
        id_carrito= null,
        comprado = false,
        activo = true) {
            this.id_carro = id_carro;
            this.id_usuario = id_usuario;
            this.id_carrito = id_carrito;
            this.comprado = comprado;
            this.activo = activo;
        }
    id_carro: number;
    id_usuario: number;
    id_carrito: number;
    comprado: boolean;
    activo: boolean;
}
