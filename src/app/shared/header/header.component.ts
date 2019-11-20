import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email: string;
  localId: string;
  userToken: string;

  constructor( private auth: AuthService, private router: Router) {
    this.auth.leerToken();
    this.email = this.auth.email;
    this.localId = this.auth.localId;
    this.userToken = this.auth.userToken;
   }

  ngOnInit() {
  }

  salir() {
    this.auth.logout();
  }

}
