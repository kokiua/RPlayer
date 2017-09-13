import { Component, OnInit } from '@angular/core';
import { FilmTypeService, FilmService } from '../_services/index';
import { FormGroup } from '@angular/forms';

@Component({
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  // Modelo para crear la película
  filmDto: any = {filmTypeDto: {id: null}};
  // Listado de tipos de peliculas
  listFilmType: any;

  constructor(
    private filmTypeService: FilmTypeService
  ) {
    console.log('Constructor PeliculaComponent');
    // Cargamos los tipos de peliculas
    this.filmTypeService.findAllOrderByDescriptionAsc().subscribe(data => this.listFilmType = data);
  }

  ngOnInit() {
    console.log('NgOnInit PeliculaComponent');
  }

  /**
   * Crea una pelicula si tiene todos los campos rellenados correctamente
   */
  createFilm() {
    console.log('Llamada a createFilm');
  }

}
