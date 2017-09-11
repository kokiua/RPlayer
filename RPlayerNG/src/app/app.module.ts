import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { FilmTypeService, FilmService } from './_services/index';

const appRoutes: Routes = [
  { path: '', component: PeliculasComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'series', component: SeriesComponent },
  { path: '**', redirectTo: 'peliculas' }
];

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    SeriesComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    FilmTypeService,
    FilmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
