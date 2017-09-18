import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SerieService, SeasonService, EpisodeService } from '../_services/index';
import { FileReaderEvent } from '../utils/fileReaderInterface';

@Component({
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

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

}
