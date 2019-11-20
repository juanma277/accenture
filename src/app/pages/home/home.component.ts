import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { VideoModel } from 'src/app/models/video.model';
import { VideosService } from '../../services/videos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { VotacionesService } from '../../services/votaciones.service';
import { VotoModel } from '../../models/voto.model';
import Swal from 'sweetalert2';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos$: Observable<VideoModel[]>;
  voto = new VotoModel();
  loading = false;
  email: string;
  localId: string;
  userToken: string;

  // tslint:disable-next-line:max-line-length
  constructor( private auth: AuthService, private router: Router, private videoService: VideosService, public sanitizer: DomSanitizer, private votoService: VotacionesService ) {
    this.auth.leerToken();
    this.email = this.auth.email;
    this.localId = this.auth.localId;
    this.userToken = this.auth.userToken;
   }

  ngOnInit() {
    this.cargarData();
  }

  cargarData() {
    this.loading = true;
    this.videos$ = combineLatest(
      this.videoService.getData(),
      this.votoService.getVotoUsers(this.localId),
    ).pipe(
      map(([videos, votes]) => videos.map(video => ({
        ...video,
        votacion: votes.some(vote => vote.videoId === video.id)
      })))
    );
    this.loading = false;
  }

  private votar(video: VideoModel, voto: number) {
    Swal.fire({
      title: 'Advertencia',
      text: `¿Estas seguro de dar una puntuación de ${voto} a ${video.nombre}?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.voto.videoId = video.id;
        this.voto.usuarioId = this.localId;
        this.voto.voto = voto;
        this.votoService.crear(this.voto).subscribe((resp: any) => {
          this.cargarData();
        });
      }
    });
  }

}
