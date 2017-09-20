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

  /**
   * Call to APIRest to save a serie
   * @param serieDto
   */
  save(serieDto: any) {
    const body = JSON.stringify(serieDto);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    const url = Constants.API_ENDPOINT + 'serie/save';
    const response = this.http.post(url, body, options).map(res => res.json()).catch(error => Promise.reject(error));
    return response;
  }

  /**
   * Call to to upload an image of a serie
   * @param idSerie
   * @param imageFile
   */
  uploadImage(idSerie: any, imageFile: any) {
    const url = Constants.API_ENDPOINT + 'serie/uploadImage/' + idSerie;
    const response = this.http.post(url, imageFile).map(res => res.json()).catch(error => Promise.reject(error));
    return response;
  }

  /**
   * elimina una serie
   * @param idSerie
   * @returns {Observable<R|T>}
   */
  delete(idSerie: any) {
    const url = Constants.API_ENDPOINT + 'serie/delete/' + idSerie;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }

}
