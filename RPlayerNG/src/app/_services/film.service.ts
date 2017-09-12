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
   * Devuelve todas las peliulas ordenadas por nombre asc
   * @returns {Observable<R|T>}
   */
  findAllOrderByNameAsc(): Observable<String[]> {
    const url = Constants.API_ENDPOINT + 'film/findAllOrderByNameAsc';
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }

  /**
   * Devuelve la película por su id
   * @param idFilm
   * @returns {Observable<R|T>}
   */
  findOne(idFilm: any): Observable<String[]> {
    const url = Constants.API_ENDPOINT + 'film/findOne/' + idFilm;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }


}
