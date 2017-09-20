import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../utils/Constants';
import { SerieService, SeasonService, EpisodeService } from '../_services/index';
import { FileReaderEvent } from '../utils/fileReaderInterface';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  // Modelo para crear la serie
  serieDto: any = {};
  // Indica si la serie ya esta guardada en bbdd
  serieSaved = true;
  // Indica si una serie se ha modificado correctamente
  serieModified = false;
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
  // Modal
  modalRef: BsModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private serieService: SerieService,
    private seasonService: SeasonService,
    private episodeService: EpisodeService
  ) {
    console.log('Constructor SerieComponent');
    // Si estamos en la ruta de editar tendremos que traernos la serie, sus temporadas y episodios
    if (this.router.url.includes('/editarSerie/')) {
      console.log('Estamos en editar');
      // Recuperamos idSerie de la URL
      this.activatedRoute.params.subscribe(params => {
        const idSerie = params['idSerie'];
        // Recuperamos la serie al llamar al servicio
        this.serieService.findOne(idSerie).subscribe(
          data => {
            this.serieDto = data;
            if (!this.serieDto.id) {
              // Si no existe la serie volvemos al listado de series
              this.router.navigateByUrl(Constants.RUTA_LISTADO_SERIES);
            } else {
              this.serieSaved = true;
              // Si hemos recuperado la serie correctamente, pasaremos a recuperar sus temporadas
              this.seasonService.findByIdSerieOrderByNumberASC(this.serieDto.id).subscribe(
                dataSeason => {
                  this.listSeason = dataSeason;
                  if (this.listSeason.length > 0) {
                    // Por defecto seleccionaremos la primera temporada, y ningun episodio
                    this.seasonActive = 1;
                    this.episodeActive = 0;
                    // Recupero la primera temporada
                    this.episodeService.findByIdSeasonOrderByNumberAsc(this.listSeason[0].id).subscribe(
                      dataEpisode => this.listEpisode = dataEpisode
                    );
                  }
                }, errorSeason => {
                  console.log(errorSeason);
                }
              );
            }
          },
          error => {
            console.log(error);
          }, () => {
            console.log('Llamada terminada');
          });
      });
    }
  }

  ngOnInit() {
    console.log('NgOnInit SerieComponent');
  }

  /**
   * Crea una serie si tiene todos los campos rellenados correctamente
   * @param serieForm
   */
  saveSerie(serieForm: FormGroup) {
    console.log('Llamada a createFilm');
    if (serieForm.valid) {
      // Desactivaremos el botón de guardar hasta que la llamada al web service haya finalizado
      this.loadingSerie = true;
      this.serieService.save(serieForm.value)
        .subscribe(
          result => {
            this.serieDto = result;
            // Estara bien guardada si no devuelve errores
            this.serieSaved = this.serieDto.errores.length === 0;
            this.serieModified = this.serieSaved;
            if (!this.serieSaved) {
              this.errorCrearSerie = 'Se ha producido un error al guardar la seriea';
            }
            this.loadingSerie = false;
            console.log('OK Serie Saved');
          },
          error => {
            this.loadingSerie = false;
            this.serieModified = false;
            this.errorCrearSerie = 'Se ha producido un error al guardar la serie';
            console.log(error);
          },
          () => {
            this.loadingSerie = false;
            console.log('Llamada terminada');
          }
        );
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
      this.serieService.uploadImage(this.serieDto.id, formData)
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
            this.okImageAdd = false;
            this.errorImage = 'Se ha producido un error al subir la imagen';
            this.loadingImage = false;
            console.log(error);
          },
          () => {
            this.loadingImage = false;
            console.log('Llamada terminada');
          }
        );
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

  /**
   * Crea una temporada para la serie actual
   */
  addSeason() {
    const idSerie = this.serieDto.id;
    let number = 1;
    if (this.listSeason.length > 0) {
      number = this.listSeason[this.listSeason.length - 1].number + 1;
    }
    const seasonToAdd: any = {idSerie: idSerie, number: number};
    this.seasonService.save(seasonToAdd).subscribe(
      data => {
        const seasonSaved = data;
        if (seasonSaved.errores.length === 0) {
          // La sesion se ha guardado correctamente
          this.seasonService.findByIdSerieOrderByNumberASC(this.serieDto.id).subscribe(
            dataSeason => {
              this.listSeason = dataSeason;
              // Como acabamos de crear la temporada, no tendra ningun capitulo
              this.listEpisode = [];
              this.episodeActive = 0;
              if (this.listSeason.length > 0) {
                // Seleccionaremos la temporada que se ha guaraddo
                this.seasonActive = seasonSaved.number;
              }
            }, errorSeason => {
              console.log(errorSeason);
            }
          );
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Llamada terminada');
      }
    );
  }

  /**
   * Elimina la ultima temporada de la serie
   */
  deleteSeason() {
    if (this.listSeason && this.listSeason.length > 0) {
      const idSeason = this.listSeason[this.listSeason.length - 1].id;
      this.seasonService.delete(idSeason).subscribe(
        result => {
          this.modalRef.hide();
          // La sesion se ha eliminado correctamente correctamente
          this.seasonService.findByIdSerieOrderByNumberASC(this.serieDto.id).subscribe(
            dataSeason => {
              this.listSeason = dataSeason;
              // No se mostrará ningun capitulo a no ser que existan temporadas con capitulos
              this.listEpisode = [];
              this.episodeActive = 0;
              if (this.listSeason.length > 0) {
                // Por defecto seleccionaremos la primera temporada, y ningun episodio
                this.seasonActive = 1;
                // Recupero los capitulos de la primera temporada
                this.episodeService.findByIdSeasonOrderByNumberAsc(this.listSeason[0].id).subscribe(
                  dataEpisode => this.listEpisode = dataEpisode
                );
              }
            }, errorSeason => {
              console.log(errorSeason);
            }
          );
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('Llamada terminada');
        }
      );
    }
  }

  /**
   * Abrir modal
   * @param {TemplateRef<any>} referenciaModal
   */
  public openModal(referenciaModal) {
    this.modalRef = this.modalService.show(referenciaModal);
  }

}
