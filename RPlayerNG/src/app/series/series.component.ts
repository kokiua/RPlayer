import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  constructor() {
   console.log('Constructor SeriesComponent');
  }

  ngOnInit() {
   console.log('NgOnInit SeriesComponent');
  }

}
