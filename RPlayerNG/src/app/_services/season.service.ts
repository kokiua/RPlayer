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
export class SeasonService {

  constructor(private http: Http) {
  }

  /**
   * Devuelve todas las temporadas de una serie
   * @param idSerie
   * @returns {Observable<R|T>}
   */
  findByIdSerieOrderByNumberASC(idSerie: any): Observable<String[]> {
    const url = Constants.API_ENDPOINT + 'season/findByIdSerieOrderByNumberASC/' + idSerie;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }

}
