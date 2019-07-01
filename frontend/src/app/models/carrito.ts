export class Carrito {
    constructor(id_carrito = null,
        id_platillo = null,
        cantidad = null,
        activo = true,
        imagen = '',
        linea = '',
        modelo = '',
        diametro = '',
        precio = null) {
            this.id_carrito = id_carrito;
            this.id_platillo = id_platillo;
            this.cantidad = cantidad;
            this.activo = activo;
            this.imagen = imagen;
            this.linea = linea;
            this.modelo = modelo;
            this.diametro = diametro;
            this.precio = precio * cantidad;
        }
    id_carrito: number;
    id_platillo: number;
    cantidad: number;
    activo: boolean;
    imagen: string;
    linea: string;
    modelo: string;
    diametro: string;
    precio: number;
}
