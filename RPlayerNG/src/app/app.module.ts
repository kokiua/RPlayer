import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

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
    FormsModule,
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
