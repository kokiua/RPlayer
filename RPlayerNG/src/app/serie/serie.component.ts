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
  serieSaved = false;
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
  // Temporada seleccionada
  seasonDtoSelected: any;
  // Lista de episodios
  listEpisode: any;
  // Modal
  modalRef: BsModalRef;
  // Episodio
  episodeDto: any = {};
  // Serie eliminada
  deletedSerie = false;

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
                    this.seasonDtoSelected = this.listSeason[0];
                    this.episodeDto = {};
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
      // Si tiene id y no tiene la version, es porque su valor vale 0
      if (serieForm.value.id && !serieForm.value.version) {
        serieForm.value.version = 0;
      }
      this.serieService.save(serieForm.value)
        .subscribe(
          result => {
            this.serieDto = result;
            // Estara bien guardada si no devuelve errores
            this.serieSaved = this.serieDto.errores.length === 0;
            this.serieModified = this.serieSaved;
            if (!this.serieSaved) {
              this.errorCrearSerie = 'Se ha producido un error al guardar la seriea';
            } else {
              this.listSeason = [];
            }
            this.loadingSerie = false;
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
   * @param seasonDto
   */
  changeSeason(seasonDto) {
    this.episodeService.findByIdSeasonOrderByNumberAsc(seasonDto.id).subscribe(
      data => {
        this.listEpisode = data;
        this.seasonDtoSelected = seasonDto;
        // Al cambiar de temporada no habra ningun episodio seleccionado
        this.episodeDto = {};
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
              // Como acabamos de crear la temporada, no tendra ningun episodio
              this.seasonDtoSelected = {};
              this.listEpisode = [];
              this.episodeDto = {};
              if (this.listSeason.length > 0) {
                // Seleccionaremos la temporada que se ha guardado, la última
                this.seasonDtoSelected = this.listSeason[this.listSeason.length - 1];
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
   * Abre el modal para eliminar una temporada
   * @param modalRef
   */
  openModalToDeleteSeason(modalRef) {
    this.seasonDtoSelected =  this.listSeason[this.listSeason.length - 1];
    this.openModal(modalRef);
  }

  /**
   * Elimina la ultima temporada de la serie
   */
  deleteSeason() {
    this.seasonService.delete(this.seasonDtoSelected.id).subscribe(
      result => {
        this.modalRef.hide();
        // La sesion se ha eliminado correctamente correctamente
        this.seasonService.findByIdSerieOrderByNumberASC(this.serieDto.id).subscribe(
          dataSeason => {
            this.listSeason = dataSeason;
            // No se mostrará ningun episodio a no ser que existan temporadas con episodios
            this.listEpisode = [];
            this.episodeDto = {};
            if (this.listSeason.length > 0) {
              // Por defecto seleccionaremos la ultima temporada, y ningun episodio
              this.seasonDtoSelected = this.listSeason[this.listSeason.length - 1];
              // Recupero los episodios de la primera temporada
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

  /**
   * Abrir modal
   * @param {TemplateRef<any>} referenciaModal
   */
  public openModal(referenciaModal) {
    this.modalRef = this.modalService.show(referenciaModal);
  }

  /**
   * Llamada al servicio para guardar episodio
   * @param episodeForm
   */
  saveEposide(episodeForm: FormGroup) {
    console.log('Llamada a guardar nuevo episodio');
    if (episodeForm.valid) {
      // Si tiene id y no tiene la version, es porque su valor vale 0
      if (episodeForm.value.id && !episodeForm.value.version) {
        episodeForm.value.version = 0;
      }
      this.episodeService.save(episodeForm.value).subscribe(
        data => {
          this.modalRef.hide();
          this.episodeDto = data;
          if (this.episodeDto.errores.length > 0) {
            console.log('Se han producido errores al guardar el episodio');
          }
          // Recupero los episodios de la temporada a la que este anyadiendo episodios
          this.episodeService.findByIdSeasonOrderByNumberAsc(this.seasonDtoSelected.id).subscribe(
            dataEpisode => this.listEpisode = dataEpisode
          );
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('LLamada finalizada');
        }
      );
    } else {
      console.log('Se ha producido un error al guardar el capitulo');
    }

  }
  /**
   * Abrir el modal para anyadir episodios
   */
  openModalToAddEpisode(modalRef) {
    this.episodeDto = {};
    this.episodeDto.number = 1;
    if (this.listEpisode.length > 0) {
      this.episodeDto.number = this.listEpisode[this.listEpisode.length - 1].number + 1;
    }
    this.openModal(modalRef);
  }

  /**
   * Abrir el modal para editar el episodio
   * @param modalRef
   * @param episodeDto
   */
  openModalToEditEpisode(modalRef, episodeDto) {
    this.episodeDto = episodeDto;
    this.openModal(modalRef);
  }

  /**
   * Abrir modal para confirmacion de eliminacion de episodio
   * Se eliminara el ultimo de la temporada seleccionada
   * @param modalRef
   */
  openModalToDeleteEpisode(modalRef) {
    this.episodeDto = this.listEpisode[this.listEpisode.length - 1];
    this.openModal(modalRef);
  }

  /**
   * Elimina un episodio (el utlimo de la temporada que tengamos seleccionada
   */
  deleteEpisode() {
    this.episodeService.delete(this.episodeDto.id).subscribe(
      data => {
        this.modalRef.hide();
        // El episode se ha eliminado correctamente, actualizamos la lista de episodios
        this.episodeService.findByIdSeasonOrderByNumberAsc(this.seasonDtoSelected.id).subscribe(
          dataSeason => {
            this.listEpisode = dataSeason;
            // Ningun episodio seleccionado
            this.episodeDto = {};
          }, errorSeason => {
            console.log(errorSeason);
          }
        );
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Llamada Finalizada');
      }
    );
  }

  /**
   * Realiza la llamada al servicio para eliminar una serie
   */
  deleteSerie() {
    this.serieService.delete(this.serieDto.id).subscribe(
      result => {
        this.modalRef.hide();
        this.deletedSerie = true;
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
