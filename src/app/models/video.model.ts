

export class VideoModel {

    id: string;
    nombre: string;
    descripcion: string;
    video: string;
    imagenUrl: string;
    estado: boolean;
    votacion?: boolean;

    constructor() {
        this.estado = true;
    }

}

