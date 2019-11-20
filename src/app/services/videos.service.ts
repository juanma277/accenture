import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VideoModel } from '../models/video.model';
import { map } from 'rxjs/operators';
import { FileItem } from '../models/file-item';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private url = 'https://itco-fcb46.firebaseio.com';
  private CARPETA_IMAGENES = 'img';

  constructor(private http: HttpClient, private db: AngularFirestore, public router: Router) { }

  crear(video: VideoModel, imagenUrl: string) {
    video.imagenUrl = imagenUrl;
    return this.http.post( `${ this.url }/videos.json`, video).pipe(
      map((resp: any) => {
        video.id = resp.name;
        return video;
      })
    );
  }

  actualizar(video: VideoModel, imagenUrl: string) {
    video.imagenUrl = imagenUrl;
    const videoTemp = {
      ...video
    };
    delete videoTemp.id;
    return this.http.put(`${ this.url }/videos/${video.id}.json`, videoTemp);
  }

  getData() {
    return this.http.get(`${ this.url }/videos.json`).pipe(
      map( this.crearArreglo)
    );
  }

  getOnly(id: string) {
    return this.http.get(`${ this.url }/videos/${id}.json`);
  }

  delete(id: string) {
    return this.http.delete(`${ this.url }/videos/${id}.json`);
  }

  private crearArreglo(videosObj: object) {
    const videos: VideoModel[] = [];
    if (videosObj === null) { return []; }

    Object.keys(videosObj). forEach( key => {
      const video: VideoModel = videosObj[key];
      video.id = key;
      videos.push(video);
    });
    return videos;
  }

  cargarImagenesFirebase( imagenes: FileItem[], video: VideoModel, accion: string ) {

    const storageRef = firebase.storage().ref();

    for ( const item of imagenes ) {

      item.estaSubiendo = true;
      if ( item.progreso >= 100 ) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
                  storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
                            .put( item.archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
              ( snapshot: firebase.storage.UploadTaskSnapshot ) =>
                          item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
              ( error ) => console.error('Error al subir', error ),
              () => {

                // console.log('Imagen cargada correctamente');

                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  item.estaSubiendo = false;
                  item.url = downloadURL;
                  // console.log(item.url);
                  if (accion === 'crear') {
                    this.crear(video, item.url).subscribe((resp: any) => {
                      Swal.close();
                      Swal.fire({
                        title: video.nombre,
                        text: 'Registro creado correctamente',
                        type: 'success'
                      });
                      this.router.navigate(['/videos']);
                    });
                  }
                  if (accion === 'actualizar') {
                    this.actualizar(video, item.url).subscribe((resp: any) => {
                      Swal.close();
                      Swal.fire({
                        title: video.nombre,
                        text: 'Registro actualizado correctamente',
                        type: 'success'
                      });
                      this.router.navigate(['/videos']);
                    });
                  }
                });
              });

    }

  }
}
