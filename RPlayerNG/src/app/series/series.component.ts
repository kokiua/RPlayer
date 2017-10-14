import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../utils/Constants';
import { SerieService, SeasonService, EpisodeService } from '../_services/index';
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
  // Season active
  seasonActive: any;
  // Lista de episodios de una temporada
  listEpisode: any;
  // Episodio seleccionado
  episodeActive: any;

  constructor(
    private serieService: SerieService,
    private modalService: BsModalService,
    private seasonService: SeasonService,
    private episodeService: EpisodeService,
    private router: Router,
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
            if (this.listSeason.length > 0) {
              // Por defecto seleccionaremos la primera temporada, y ningun episodio
              this.seasonActive = 1;
              this.episodeActive = 0;
              // Recupero la primera temporada
              this.episodeService.findByIdSeasonOrderByNumberAsc(this.listSeason[0].id).subscribe(
                dataEpisode => this.listEpisode = dataEpisode
              );
            }
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
   * Inicializa el video del episodio seleccionado en en vlc servidor
   * @param idEpisode
   * @param episodeNumber
   */
  startEpisode(idEpisode, episodeNumber) {
    this.episodeService.startEpisode(idEpisode).subscribe(data => this.episodeActive = episodeNumber);
  }

  /**
   * Quita la película que actualmente se está reproducciendo
   */
  stopEmision() {
    this.episodeService.stopEmision().subscribe();
  }

  /**
   * Redirigimos a editar serie
   */
  goToEditSerie() {
    this.modalRef.hide();
    this.router.navigateByUrl(Constants.RUTA_EDITAR_SERIE + '/' + this.serieDto.id);
  }

}
