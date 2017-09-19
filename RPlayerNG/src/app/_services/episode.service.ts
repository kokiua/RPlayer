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

  /**
   * Call to APIRest to save a episode
   * @param episodeDto
   */
  save(episodeDto: any) {
    const body = JSON.stringify(episodeDto);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    const url = Constants.API_ENDPOINT + 'episode/save';
    const response = this.http.post(url, body, options).map(res => res.json()).catch(error => Promise.reject(error));
    return response;
  }

}
