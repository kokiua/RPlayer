/**
 * Created by manromero on 11/09/2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Constants } from '../utils/Constants';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SerieService {

  constructor(private http: Http) {
  }

  /**
   * Devuelve todas las series por nombre asc
   * @returns {Observable<R|T>}
   */
  findAllOrderByNameAsc(): Observable<String[]> {
    const url = Constants.API_ENDPOINT + 'serie/findAllOrderByNameAsc';
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }

  /**
   * Devuelve la serie por su id
   * @param idFilm
   * @returns {Observable<R|T>}
   */
  findOne(idSerie: any): Observable<String[]> {
    const url = Constants.API_ENDPOINT + 'serie/findOne/' + idSerie;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }

}
