import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements  CanActivate {
  
  localId: string;

  constructor( private auth: AuthService, private router: Router) {
    this.auth.leerToken();
    this.localId = this.auth.localId;
  }

  canActivate(): boolean  {

    if ( this.auth.localId == 'amBeXQbCU8Mm3UVblef7vINiPDx2' || this.auth.localId == 'upIUWAmrfTQCt6bTTKrPiTwY9Sj2') {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }

}
