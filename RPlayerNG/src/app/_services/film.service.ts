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
export class FilmService {
  public token: string;

  constructor(private http: Http) {
  }

  /**
   * Devuelve las peliculas de un tipo determinado, si es 0 devolverá todas
   * @param idFilmType
   * @returns {Observable<R|T>}
   */
  findByIdFilmTypeOrderByNameAsc(idFilmType: any): Observable<String[]> {
    const url = Constants.API_ENDPOINT + 'film/findByIdFilmTypeOrderByNameAsc/' + idFilmType;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }

}
