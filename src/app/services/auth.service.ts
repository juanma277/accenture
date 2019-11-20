import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyB4bDey2pICr6r9d9uYC322nTZwEDV_2RA';

  userToken: string;
  email: string;
  localId: string;


  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient, private router: Router ) {
    this.leerToken();
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
    this.userToken = '';
    this.localId = '';
    this.router.navigateByUrl('/login');
  }

  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map( (resp: any) => {
        this.guardarToken( resp.idToken, resp.email, resp.localId );
        return resp;
      })
    );

  }

  nuevoUsuario( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apikey }`,
      authData
    ).pipe(
      map( (resp: any) => {
        this.guardarToken( resp.idToken, resp.email, resp.localId );
        return resp;
      })
    );

  }


  private guardarToken( idToken: string, email: string, localId: string ) {

    this.userToken = idToken;
    this.localId = localId;
    this.email = email;
    localStorage.setItem('token', idToken);
    localStorage.setItem('email', email);
    localStorage.setItem('localId', localId);

    // tslint:disable-next-line:prefer-const
    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );


  }

  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
      this.email = localStorage.getItem('email');
      this.localId = localStorage.getItem('localId');
    } else {
      this.userToken = '';
      this.email = '';
      this.localId = '';
    }

    return this.userToken;

  }


  estaAutenticado(): boolean {

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }


  }


}
