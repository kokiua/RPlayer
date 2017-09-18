import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { CrearPeliculaComponent } from './crearPelicula/crearPelicula.component';
import { EditarPeliculaComponent } from './editarPelicula/editarPelicula.component';
import { SerieComponent } from './serie/serie.component';
import { FilmTypeService, FilmService, SerieService, SeasonService, EpisodeService } from './_services/index';


const appRoutes: Routes = [
  { path: '', component: PeliculasComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'crearPelicula', component: CrearPeliculaComponent },
  { path: 'editarPelicula/:idFilm', component: EditarPeliculaComponent },
  { path: 'crearSerie', component: SerieComponent },
  { path: 'editarSerie/:idSerie', component: SerieComponent },
  { path: '**', redirectTo: 'peliculas' }
];

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    SeriesComponent,
    CrearPeliculaComponent,
    EditarPeliculaComponent,
    SerieComponent
  ],
  imports: [
    FormsModule,
    CustomFormsModule,
    HttpModule,
    BrowserModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    FilmTypeService,
    FilmService,
    SerieService,
    SeasonService,
    EpisodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
