/**
 * Created by manromero on 11/09/2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Constants } from '../utils/Constants';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FilmTypeService {
  public token: string;

  constructor(private http: Http) {
  }

  /**
   * Devuelve todos los tipos de peliculas ordenados por descripcion asc
   * @returns {Observable<R|T>}
   */
  findAllOrderByDescriptionAsc(): Observable<String[]> {
    const url = Constants.API_ENDPOINT + 'filmType/findAllOrderByDescriptionAsc';
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }

}
