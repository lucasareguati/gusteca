

export class Platillo {

    constructor(id_platillo= null,
        linea= '',
        modelo= '',
        aleacion= '',
        diametro= '',
        descripcion= '',
        stock= null,
        precio= null,
        marca= '',
        categoria= '',
        imagen= '',
        baja= false) {
            this.id_platillo = id_platillo;
            this.linea = linea;
            this.modelo = modelo;
            this.aleacion = aleacion;
            this.diametro = diametro;
            this.descripcion = descripcion;
            this.stock = stock;
            this.precio = precio;
            this.marca = marca;
            this.categoria = categoria;
            this.imagen = imagen;
            this.baja = baja;
        }
 
    id_platillo: number;
    linea: string;
    modelo: string;
    aleacion: string;
    diametro: string;
    descripcion: string;
    stock: number;
    precio: number;
    marca: string;
    categoria: string;
    imagen: string;
    baja: boolean;
}

