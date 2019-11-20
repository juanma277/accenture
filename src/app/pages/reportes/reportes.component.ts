import { Component, OnInit } from '@angular/core';
import { VotacionesService } from '../../services/votaciones.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { VideosService } from '../../services/videos.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  videosMap: any[] =[];
  votos: any[] = [];
  loading = false;
  totalVotos: number;

  constructor(private votoService: VotacionesService, private videoService: VideosService) { }

  ngOnInit() {
    this.cargarData();
  }

  cargarData() {
    this.loading = true;
    forkJoin([
      this.videoService.getData(),
      this.votoService.getVotosAll()
    ]).subscribe(([videos, votos]) => {
      this.totalVotos = votos.length,
      this.videosMap = videos.map((video) => {
        const videoVotos = votos.reduce((total, item) =>
          item.videoId === video.id ? ( total + item.voto) : total,
          0);
        const totalVotoVideo = votos.reduce((cuenta, item) =>
        item.videoId === video.id ? ( cuenta = cuenta + 1) : cuenta,
        0);
        return { ...video, votos: videoVotos, promedio: videoVotos / totalVotoVideo, cantidad: totalVotoVideo };
      });
      // console.log(this.videosMap);
    });
    this.loading = false;
  }

}
