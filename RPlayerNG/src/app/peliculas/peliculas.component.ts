import { Component, OnInit } from '@angular/core';
import { FilmTypeService, FilmService } from '../_services/index';

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
  listFilm: any;

  constructor(
    private filmTypeService: FilmTypeService,
    private filmService: FilmService
  ) {
    console.log('Constructor PeliculasComponent');
    // Cargamos los tipos de peliculas
    this.filmTypeService.findAllOrderByDescriptionAsc().subscribe(data => this.listFilmType = data);
    // Por defecto no habrá ningún tipo de pelicula seleccionada
    this.typeFilmSelected = 0;
    // Recuperamos las peliculas
    this.recoverFilmWithIdFilmType();
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
    this.recoverFilmWithIdFilmType();
  }

  /**
   * Recupera las películas por genero, si no se ha seleccionado genero traera todas
   */
  recoverFilmWithIdFilmType() {
    this.filmService.findByIdFilmTypeOrderByNameAsc(this.typeFilmSelected).subscribe(data => this.listFilm = data);
  }

}
