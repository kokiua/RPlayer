import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../utils/Constants';
import { FilmTypeService, FilmService } from '../_services/index';
import { FileReaderEvent } from '../utils/fileReaderInterface';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  templateUrl: './editarPelicula.component.html',
  styleUrls: ['./editarPelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  // Modelo para crear la película
  filmDto: any = {filmTypeDto: null};
  // Listado de tipos de peliculas
  listFilmType: any;
  // Activara y desactivara el boton de guardar crearPelicula cuando se esté editando
  loadingFilm = false;
  // Si la crearPelicula se ha editado correctamente pondremos un mensaje y permitiremos añadir imagen
  okSaveFilm = false;
  // Error al editar crearPelicula
  errorEditarPelicula: any;
  // Referencia
  @ViewChild('imageInput') inputEl: ElementRef;
  // Previsualizacino imagen
  imageAMostrar: any;
  // Activara y desactivara el boton de guardar imagen cuando se esté editando
  loadingImage = false;
  // Imagen añadida correctamente
  okImageAdd = false;
  // Error al subir imagen
  errorImage: any;
  // Modal
  modalRef: BsModalRef;
  // Indica si la crearPelicula ha sido eliminada
  deleted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmService: FilmService,
    private filmTypeService: FilmTypeService,
    private modalService: BsModalService,
  ) {
    console.log('Constructor EditPeliculaComponent');
    // Recuperamos la Film de la URL
    this.activatedRoute.params.subscribe(params => {
      const idFilm = params['idFilm'];
      // Recuperamos la pelicula al llamar al servicio
      this.filmService.findOne(idFilm).subscribe(
        data => {
          this.filmDto = data;
          if (!this.filmDto.id) {
            this.router.navigateByUrl(Constants.RUTA_LISTADO_PELICULAS);
          }
        },
        error => {
          console.log(error);
        }, () => {
          console.log('Llamada terminada');
        });
    });
    // Cargamos los tipos de peliculas
    this.filmTypeService.findAllOrderByDescriptionAsc().subscribe(data => this.listFilmType = data);
  }

  ngOnInit() {
    console.log('NgOnInit EditPeliculaComponent');
  }

  /**
   * Crea una crearPelicula si tiene todos los campos rellenados correctamente
   * @param createFilmForm
   */
  saveFilm(editFilmForm: FormGroup) {
    console.log('Llamada a saveFilm');
    if (editFilmForm.valid) {
      // Desactivaremos el botón de guardar hasta que la llamada al web service haya finalizado
      this.loadingFilm = true;
      // Creamos el filmTypeDto dentro de filmDto
      const idFilmType = editFilmForm.value.filmTypeDto;
      editFilmForm.value.filmTypeDto = {id: idFilmType};
      console.log(editFilmForm.value);
      this.filmService.save(editFilmForm.value)
        .subscribe(
          result => {
            this.filmDto = result;
            this.okSaveFilm = this.filmDto.errores.length === 0;
            if (!this.okSaveFilm) {
              this.errorEditarPelicula = 'Se ha producido un error al editar la película';
            }
            this.loadingFilm = false;
            console.log('OK Film Created');
          },
          error => {
            this.loadingFilm = false;
            this.errorEditarPelicula = 'Se ha producido un error al editar la película';
            console.log(error);
          },
          () => {
            this.loadingFilm = false;
            console.log('Llamada terminada');
          }
        );
    } else {
      this.errorEditarPelicula = 'Se ha producido un error al editar la película';
      console.log('Error en el formulario de crear film');
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
      this.filmService.uploadImage(this.filmDto.id, formData)
        .subscribe(
          result => {
            this.filmDto = result;
            this.okImageAdd = this.filmDto.image !== undefined && this.filmDto.image != null;
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
    }
  }

  /**
   * Abrir modal
   * @param {TemplateRef<any>} templateRef
   */
  public openModal(templateRef) {
    this.modalRef = this.modalService.show(templateRef, Object.assign({class: 'modal-sm'}));
  }

  /**
   * Elimina una crearPelicula
   */
  deleteFilm() {
    this.filmService.delete(this.filmDto.id).subscribe(
      result => {
        this.modalRef.hide();
        this.deleted = true;
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
