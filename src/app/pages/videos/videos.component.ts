import { Component, OnInit } from '@angular/core';
import { VideosService } from '../../services/videos.service';
import { VideoModel } from '../../models/video.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  videos: VideoModel[] = [];
  loading = false;
  email: string;
  localId: string;
  userToken: string;

  constructor(private videoService: VideosService, private auth: AuthService, private router: Router, public sanitizer: DomSanitizer) {
    this.auth.leerToken();
    this.email = this.auth.email;
    this.localId = this.auth.localId;
    this.userToken = this.auth.userToken;
   }

  ngOnInit() {
    this.loading = true;
    this.videoService.getData().subscribe(resp => {
      this.videos = resp;
      this.loading = false;
    });
  }

  borrar(video: VideoModel, index: number) {
    Swal.fire({
      title: 'Advertencia',
      text: `¿Estas seguro de borrar a ${video.nombre}?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.videoService.delete(video.id).subscribe((resp: any) => {
          this.videos.splice(index, 1);
        });
      }
    });
  }
}
