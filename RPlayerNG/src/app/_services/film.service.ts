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
export class FilmService {

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

  /**
   * Call to APIRest UPCOMPANY for creating a new company
   * @param createCompanyForm
   */
  save(filmDto: any) {
    const body = JSON.stringify(filmDto);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    const url = Constants.API_ENDPOINT + 'film/save';
    const response = this.http.post(url, body, options).map(res => res.json()).catch(error => Promise.reject(error));
    return response;
  }

  /**
   * Call to APIRest UPCOMPANY for creating a new company
   * @param createCompanyForm
   */
  uploadImage(idFilm: any, imageFile: any) {
    const url = Constants.API_ENDPOINT + 'film/uploadImage/' + idFilm;
    const response = this.http.post(url, imageFile).map(res => res.json()).catch(error => Promise.reject(error));
    return response;
  }

  /**
   * Inicializa una pelicula
   * @param idFilm
   * @returns {Observable<R|T>}
   */
  startFilm(idFilm: any) {
    const url = Constants.API_ENDPOINT + 'film/startFilm/' + idFilm;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }

  /**
   * elimina una pelicula
   * @param idFilm
   * @returns {Observable<R|T>}
   */
  delete(idFilm: any) {
    const url = Constants.API_ENDPOINT + 'film/delete/' + idFilm;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(error => Promise.reject(error));
  }

}
