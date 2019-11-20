import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VotoModel } from '../models/voto.model';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VotacionesService {

  private url = 'https://itco-fcb46.firebaseio.com';

  constructor(private http: HttpClient, public auth: AuthService ) { }

  crear(voto: VotoModel) {
    return this.http.post( `${ this.url }/votaciones.json`, voto).pipe(
      map((resp: any) => {
        voto.id = resp.name;
        return voto;
      })
    );
  }

  getVotoUsers(localId: string) {
    return this.http.get( `${ this.url }/votaciones.json`).pipe(
      map((resp: any) => {
        return this.crearArreglo(resp, localId);
      })
    );
  }

  getVotosAll() {
    return this.http.get( `${ this.url }/votaciones.json`).pipe(
      map((resp: any) => {
        return this.crearArregloAll(resp);
      })
    );
  }

  crearArreglo(votosObj: object, localId: string) {
    const votos: VotoModel[] = [];
    if (votosObj === null) { return []; }

    Object.keys(votosObj). forEach( key => {
      if (votosObj[key].usuarioId === localId) {
        const voto: VotoModel = votosObj[key];
        voto.id = key;
        votos.push(voto);
      }
    });
    return votos;
  }

  crearArregloAll(votosObj: object) {
    const votos: VotoModel[] = [];
    if (votosObj === null) { return []; }

    Object.keys(votosObj). forEach( key => {
        const voto: VotoModel = votosObj[key];
        voto.id = key;
        votos.push(voto);
    });
    return votos;
  }
}
