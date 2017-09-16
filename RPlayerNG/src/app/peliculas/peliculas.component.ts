import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmTypeService, FilmService } from '../_services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  // Listado de tipos de peliculas
  listFilmType: any;
  // Tipo de pelicula seleccionado
  typeFilmSelected: any;
  // Listado de peliculas
  listFullFilm: any;
  // Listado de peliculas que se muestran
  listFilm: any;
  // Filtro por el nombre
  filtroName: any;
  // Modal
  modalRef: BsModalRef;
  // Pelicula seleccionada
  filmDto: any;

  constructor(
    private filmTypeService: FilmTypeService,
    private filmService: FilmService,
    private modalService: BsModalService,
    private router: Router,
  ) {
    console.log('Constructor PeliculasComponent');
    // Cargamos los tipos de peliculas
    this.filmTypeService.findAllOrderByDescriptionAsc().subscribe(data => this.listFilmType = data);
    // Por defecto no habrá ningún tipo de pelicula seleccionada
    this.typeFilmSelected = 0;
    // Recuperamos todas las peliculas
    this.filmService.findAllOrderByNameAsc().subscribe(
      data => {
        this.listFullFilm = data;
        this.listFilm = data;
      },
      error => {
        console.log(error);
      }
    );
    // En un primer momento el filtro del nombre estará vacio
    this.filtroName = '';
  }

  ngOnInit() {
    console.log('NgOnInit PeliculasComponent');
  }

  /**
   * Cambia el tipo de categoria seleccionada
   * @param typeFilmSelectedId
   */
  changeTypeFilmSelected(typeFilmSelectedId: any) {
    this.typeFilmSelected = typeFilmSelectedId;
    this.filterFilmsByIdTypeFilmAndName();
  }

  /**
   * Filtra las películas por un idFilmType y `por un nombre
   */
  filterFilmsByIdTypeFilmAndName() {
    console.log('Filtro películas');
    // Si el filtro por nombre es vacio solo filtro por tipo
    if (this.filtroName === '') {
      // Si el filtro por tipo es 0 devuelvo todas las peliculas, si no filtro por tipo
      if (this.typeFilmSelected === 0) {
        this.listFilm = this.listFullFilm;
      } else {
        this.listFilm = [];
        for (const film of this.listFullFilm) {
          if (film.filmTypeDto.id === this.typeFilmSelected ) {
            this.listFilm.push(film);
          }
        }
      }
    }else {
      // Si el filtro de nombre no es vacio y el filtro de tipo es 0, solo filtro por su nombre
      if (this.typeFilmSelected === 0) {
        this.listFilm = [];
        for (const film of this.listFullFilm) {
          if (film.name.toLowerCase().includes(this.filtroName.toLowerCase())) {
            this.listFilm.push(film);
          }
        }
      } else {
        // Si el filtro de nombre no es vacio y el de tipo no es 0, filtro por los dos tipos
        this.listFilm = [];
        for (const film of this.listFullFilm) {
          if (film.filmTypeDto.id === this.typeFilmSelected &&  film.name.includes(this.filtroName)) {
            this.listFilm.push(film);
          }
        }
      }
    }
  }

  /**
   * Abrir modal
   * @param {TemplateRef<any>} templateRef
   * @param idFilm
   */
  public openModal(templateRef, idFilm) {
    // Recuperamos la film que se ha seleccionado
    this.filmService.findOne(idFilm).subscribe(
      data => {
        this.filmDto = data;
        this.modalRef = this.modalService.show(templateRef, Object.assign({class: 'modal-lg'}));
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Abre la direccion del trailer
   */
  openTrailerURL() {
    window.open(this.filmDto.trailerUrl);
  }

  /**
   * Inicializa el video de la pelicula seleccionada en vlc servidor
   */
  startFilm() {
    this.filmService.startFilm(this.filmDto.id).subscribe();
  }

  /**
   * Redirige a la pelicula actual
   */
  goToEditFilm() {
    this.modalRef.hide();
    this.router.navigateByUrl('/editarPelicula/' + this.filmDto.id);
  }

}
