import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivo: FileItem[] = [];
  @Output() mouseHover: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  // Mouse encima
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseHover.emit(true);
    this.prevenirDetener(event);
  }

  // Mouse Fuera
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseHover.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const transferencia = this.getTrasnferencia(event);

    if (!transferencia) {
      return;
    }

    this.extraerArcvivo(transferencia.files);
    this.prevenirDetener(event);
    this.mouseHover.emit(false);
  }

  private getTrasnferencia( event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArcvivo( archivoLista: File) {
    // tslint:disable-next-line:forin
    for (const propiedad in Object.getOwnPropertyNames(archivoLista)) {
      const archivoTemp = archivoLista[propiedad];
      if (this.archivoPuedeSerCargado(archivoTemp)){
        const nuevoArchivo = new FileItem(archivoTemp);
        this.archivo.push(nuevoArchivo);
      }
    }
    // console.log(this.archivo);
  }

  // Validaciones

  private archivoPuedeSerCargado(archivo: File): boolean {
    if (!this.archivoSeleccionado(archivo.name) && this.trueImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }


  private prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private archivoSeleccionado( nombre: string): boolean {
    for ( const archivo of this.archivo ) {

      if ( archivo.nombreArchivo === nombre  ) {
        // console.log('El archivo ' + nombre + ' ya esta agregado');
        return true;
      }

    }
    return false;
  }

  private trueImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
