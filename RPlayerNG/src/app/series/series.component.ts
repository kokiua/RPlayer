import { Component, OnInit } from '@angular/core';
import { SerieService, SeasonService } from '../_services/index';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  // Listado compelto de series
  listFullSerie: any;
  // Listado de series que se muestran
  listSerie: any;
  // Filtro por el nombre
  filtroName: any;
  // Modal
  modalRef: BsModalRef;
  // Serie seleccionada
  serieDto: any;
  // Lista de temporadas de una serie
  listSeason: any;

  constructor(
    private serieService: SerieService,
    private modalService: BsModalService,
    private seasonService: SeasonService
  ) {
   console.log('Constructor SeriesComponent');
    // Recuperamos todas las series
    this.serieService.findAllOrderByNameAsc().subscribe(
      data => {
        this.listFullSerie = data;
        this.listSerie = data;
      },
      error => {
        console.log(error);
      }
    );
    // En un primer momento el filtro del nombre estará vacio
    this.filtroName = '';
  }

  ngOnInit() {
   console.log('NgOnInit SeriesComponent');
  }

  /**
   * Filtra las series por su name
   */
  filterSerieByName() {
    console.log('Filtro películas');
    // Si el filtro por nombre no es vacio filtro
    if (this.filtroName !== '') {
      this.listSerie = [];
      for (const serie of this.listFullSerie) {
        if (serie.name.toLowerCase().includes(this.filtroName.toLowerCase())) {
          this.listSerie.push(serie);
        }
      }
    }
  }

  /**
   * Abrir modal
   * @param {TemplateRef<any>} templateRef
   * @param idSerie
   */
  public openModal(templateRef, idSerie) {
    // Recuperamos la film que se ha seleccionado
    this.serieService.findOne(idSerie).subscribe(
      data => {
        this.serieDto = data;
        this.seasonService.findByIdSerieOrderByNumberASC(this.serieDto.id).subscribe(
          dataSeason => {
            this.listSeason = dataSeason;
            this.modalRef = this.modalService.show(templateRef, Object.assign({class: 'modal-lg'}));
          }, errorSeason => {
            console.log(errorSeason);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

}
