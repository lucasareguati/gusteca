export class Carrito {
    constructor(id_carrito = null,
        id_platillo = null,
        cantidad = null,
        activo = true,
        ) {
            this.id_carrito = id_carrito;
            this.id_platillo = id_platillo;
            this.cantidad = cantidad;
            this.activo = activo;
        }
    id_carrito: number;
    id_platillo: number;
    cantidad: number;
    activo: boolean;
}
