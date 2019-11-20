import { Component, OnInit } from '@angular/core';
import { VideoModel } from '../../models/video.model';
import { NgForm } from '@angular/forms';
import { VideosService } from '../../services/videos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  video = new VideoModel();
  sobreElement = false;
  archivo: FileItem[] = [];
  editarImg: boolean;
  email: string;
  localId: string;
  userToken: string;

  // tslint:disable-next-line:max-line-length
  constructor(private videoService: VideosService, private params: ActivatedRoute, private router: Router, private auth: AuthService) {
    this.auth.leerToken();
    this.email = this.auth.email;
    this.localId = this.auth.localId;
    this.userToken = this.auth.userToken;
   }

  ngOnInit() {
    const id = this.params.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.videoService.getOnly(id).subscribe((resp: VideoModel) => {
        if (resp) {
          this.video = resp;
          this.video.id = id;
        } else {
          this.router.navigate(['/videos']);
        }
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    if (this.video.id) {
      if (this.editarImg && this.archivo.length === 0) {
        Swal.close();
        Swal.fire({
          title: 'Advertencia',
          text: 'Debes seleccionar una imagen',
          type: 'warning'
        });
        return;
      }

      if (!this.editarImg && this.archivo.length === 0) {
        this.videoService.actualizar(this.video, this.video.imagenUrl).subscribe((resp: any) => {
          Swal.close();
          Swal.fire({
            title: this.video.nombre,
            text: 'Registro actualizado correctamente',
            type: 'success'
          });
        });
        this.router.navigateByUrl('/videos');
      }

      if (this.editarImg && this.archivo.length > 0) {
        this.videoService.cargarImagenesFirebase(this.archivo, this.video, 'actualizar');
      }
    } else {
      this.videoService.cargarImagenesFirebase(this.archivo, this.video, 'crear');
    }

    /*let peticion: Observable<any>;

    if (this.video.id) {
      peticion = this.videoService.actualizar(this.video);
    } else {
      peticion = this.videoService.crear(this.video);
    }

    peticion.subscribe((resp: any) => {
      Swal.close();
      Swal.fire({
        title: this.video.nombre,
        text: 'Registro actualizado correctamente',
        type: 'success'
      });
      this.router.navigateByUrl('/videos');
    });*/

  }

}
