import { Component } from '@angular/core';
import { Constants } from './utils/Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = true;
  linkActive = Constants.RUTA_LISTADO_PELICULAS;
}
