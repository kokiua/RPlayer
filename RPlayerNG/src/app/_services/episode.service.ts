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
export class EpisodeService {

  constructor(private http: Http) {
  }

  /**
   * Devuelve todas las temporadas de una serie
   * @param idSeason
   * @returns {Observable<R|T>}
   */
  findByIdSeasonOrderByNumberAsc(idSeason: any): Observable<String[]> {
    const url = Constants.API_ENDPOINT + 'episode/findByIdSeasonOrderByNumberAsc/' + idSeason;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }

  /**
   * Inicializa un episodio
   * @param idEpisode
   * @returns {Observable<R|T>}
   */
  startEpisode(idEpisode: any) {
    const url = Constants.API_ENDPOINT + 'episode/startEpisode/' + idEpisode;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }

}
