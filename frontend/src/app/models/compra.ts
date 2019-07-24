import { Time } from '@angular/common';

export class Compra {
    constructor(id_compra = null,
        id_carro = null,
        id_usuario = null,
        id_order = null,
        estado = null,
        fechaCompra = null,
        horaCompra = null,
        total = null) {
            this.id_compra = id_compra;
            this.id_carro = id_carro;
            this.id_usuario = id_usuario;
            this.id_order = id_order;
            this.estado = estado;
            this.fechaCompra = fechaCompra;
            this.horaCompra = horaCompra;
            this.total = total;
        }
    id_compra: number;
    id_carro: number;
    id_usuario: number;
    id_order: number;
    estado: string;
    fechaCompra: Date;
    horaCompra: Time;
    total: number;
}
