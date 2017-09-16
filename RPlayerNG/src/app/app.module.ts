import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { EditarPeliculaComponent } from './editarPelicula/editarPelicula.component';
import { FilmTypeService, FilmService } from './_services/index';


const appRoutes: Routes = [
  { path: '', component: PeliculasComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'pelicula', component: PeliculaComponent },
  { path: 'editarPelicula/:idFilm', component: EditarPeliculaComponent },
  { path: '**', redirectTo: 'peliculas' }
];

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    SeriesComponent,
    PeliculaComponent,
    EditarPeliculaComponent
  ],
  imports: [
    FormsModule,
    CustomFormsModule,
    HttpModule,
    BrowserModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    FilmTypeService,
    FilmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
