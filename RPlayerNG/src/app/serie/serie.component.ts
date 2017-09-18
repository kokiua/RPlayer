import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SerieService, SeasonService, EpisodeService } from '../_services/index';
import { FileReaderEvent } from '../utils/fileReaderInterface';

@Component({
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  // Modelo para crear la serie
  serieDto: any = {};
  // Serie created
  serieSaved = true;
  // Indica si se esta procesando el guardado de la serie
  loadingSerie = false;
  // Indica si se ha producido un error al crear la serie
  errorCrearSerie: any;
  // Referencia Imagen
  @ViewChild('imageInput') inputEl: ElementRef;
  // Previsualizacino imagen
  imageAMostrar: any;
  // Activara y desactivara el boton de guardar imagen cuando se esté editando
  loadingImage = false;
  // Imagen añadida correctamente
  okImageAdd = false;
  // Error al subir imagen
  errorImage: any;
  // Lista de temporadas
  listSeason: any;
  // Temporada activa
  seasonActive: any;
  // Lista de capitulos
  listEpisode: any;
  // Episodio activo
  episodeActive: any;

  constructor(
    private serieSerivice: SerieService,
    private seasonService: SeasonService,
    private episodeService: EpisodeService,
  ) {
    console.log('Constructor SerieComponent');
  }

  ngOnInit() {
    console.log('NgOnInit SerieComponent');
  }

  /**
   * Crea una serie si tiene todos los campos rellenados correctamente
   * @param createSerieForm
   */
  createSerie(createSerieForm: FormGroup) {
    console.log('Llamada a createFilm');
    if (createSerieForm.valid) {
      // Desactivaremos el botón de guardar hasta que la llamada al web service haya finalizado
      this.loadingSerie = true;
      /*
      this.filmService.save(createFilmForm.value)
        .subscribe(
          result => {
            this.serieDto = result;
            // Estara bien guardada si no devuelve errores
            this.serieSaved = this.serieDto.errores.length === 0;
            if (!this.serieSaved) {
              this.errorCrearSerie = 'Se ha producido un error al guardar la seriea';
            }
            this.loadingSerie = false;
            console.log('OK Serie Saved');
          },
          error => {
            this.loadingSerie = false;
            this.errorCrearSerie = 'Se ha producido un error al guardar la serie';
            console.log(error);
          },
          () => {
            this.loadingFilm = false;
            console.log('Llamada terminada');
          }
        );
        */
    } else {
      this.errorCrearSerie = 'Se ha producido un error al guardar la serie';
      console.log('Error en el formulario de guardar serie');
    }
  }

  /**
   * Previsualizamos imagen
   * @param {Event} imageInput
   */
  chargeImage(imageInput: Event) {
    const target = (<HTMLInputElement>imageInput.target);
    if (target.files && target.files[0]) {
      // Imagen a premostrar
      const reader = new FileReader();
      reader.onload = (event: FileReaderEvent) => {
        this.imageAMostrar = event.target.result;
      };
      reader.readAsDataURL(target.files[0]);
    }
  }

  /**
   * Subir imagen al servidor
   */
  uploadImage() {
    const inputEl: HTMLInputElement = this.inputEl.nativeElement;
    if (inputEl.files && inputEl.files[0]) {
      this.loadingImage = true;
      const formData = new FormData();
      formData.append('file', inputEl.files[0]);
      this.errorImage = null;
      /*
      this.filmService.uploadImage(this.serieDto.id, formData)
        .subscribe(
          result => {
            this.serieDto = result;
            this.okImageAdd = this.serieDto.image !== undefined && this.serieDto.image != null;
            if (!this.okImageAdd) {
              this.errorImage = 'Se ha producido un error al subir la imagen';
            }
            this.loadingImage = false;
            console.log('File Upload');
          },
          error => {
            this.errorImage = 'Se ha producido un error al subir la imagen';
            this.loadingImage = false;
            console.log(error);
          },
          () => {
            this.loadingImage = false;
            console.log('Llamada terminada');
          }
        );
        */
    }
  }

  /**
   * Cambiamos de temporada
   * @param idSeason
   * @param seasonNumber
   */
  changeSeason(idSeason, seasonNumber) {
    this.episodeService.findByIdSeasonOrderByNumberAsc(idSeason).subscribe(
      data => {
        this.listEpisode = data;
        this.seasonActive = seasonNumber;
        // Al cambiar de temporada no habra ningun episodio seleccionado
        this.episodeActive = 0;
      }, error => {
        console.log(error);
      }
    );
  }

}
