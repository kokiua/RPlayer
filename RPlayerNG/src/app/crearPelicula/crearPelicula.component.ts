import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilmTypeService, FilmService } from '../_services/index';
import { FileReaderEvent } from '../utils/fileReaderInterface';

@Component({
  templateUrl: './crearPelicula.component.html',
  styleUrls: ['./crearPelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  // Modelo para crear la película
  filmDto: any = {filmTypeDto: null};
  // Listado de tipos de peliculas
  listFilmType: any;
  // Activara y desactivara el boton de guardar crearPelicula cuando se esté creando
  loadingFilm = false;
  // Si la crearPelicula se ha creado correctamente pondremos un mensaje y permitiremos añadir imagen
  okCreated = false;
  // Error al crear crearPelicula
  errorCrearPelicula: any;
  // Referencia
  @ViewChild('imageInput') inputEl: ElementRef;
  // Previsualizacino imagen
  imageAMostrar: any;
  // Activara y desactivara el boton de guardar imagen cuando se esté creando
  loadingImage = false;
  // Imagen añadida correctamente
  okImageAdd = false;
  // Error al subir imagen
  errorImage: any;

  constructor(
    private filmService: FilmService,
    private filmTypeService: FilmTypeService
  ) {
    console.log('Constructor CrearPeliculaComponent');
    // Cargamos los tipos de peliculas
    this.filmTypeService.findAllOrderByDescriptionAsc().subscribe(data => this.listFilmType = data);
  }

  ngOnInit() {
    console.log('NgOnInit CrearPeliculaComponent');
  }

  /**
   * Crea una crearPelicula si tiene todos los campos rellenados correctamente
   * @param createFilmForm
   */
  createFilm(createFilmForm: FormGroup) {
    console.log('Llamada a createFilm');
    if (createFilmForm.valid) {
      // Desactivaremos el botón de guardar hasta que la llamada al web service haya finalizado
      this.loadingFilm = true;
      // Creamos el filmTypeDto dentro de filmDto
      const idFilmType = createFilmForm.value.filmTypeDto;
      createFilmForm.value.filmTypeDto = {id: idFilmType};
      this.filmService.save(createFilmForm.value)
        .subscribe(
          result => {
            this.filmDto = result;
            // Estara bien creada si devuelve un id
            this.okCreated = this.filmDto.id !== undefined && this.filmDto.id != null;
            if (!this.okCreated) {
              this.errorCrearPelicula = 'Se ha producido un error al crear la película';
            }
            this.loadingFilm = false;
            console.log('OK Film Created');
          },
          error => {
            this.loadingFilm = false;
            this.errorCrearPelicula = 'Se ha producido un error al crear la película';
            console.log(error);
          },
          () => {
            this.loadingFilm = false;
            console.log('Llamada terminada');
          }
        );
    } else {
      this.errorCrearPelicula = 'Se ha producido un error al crear la película';
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

}
