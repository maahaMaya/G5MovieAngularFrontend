import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../model/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseURL = "http://localhost:9093/api/movie";
  constructor(private httpClient: HttpClient) { }


  public getMovieById(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.baseURL}/${id}`);
  }

  public getMovieSearch(searchKeyword: string): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.baseURL}/search/${searchKeyword}`);
  }

  public searchMovieByAction(searchKeyword: string): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.baseURL}/searchMovieByAction/${searchKeyword}`);
  }

  getFullMovieList(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.baseURL}/viewAllMovie`);
  }

  addMovie(Movie: Movie): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/addMovie`, Movie);
  }

  updateMovie(Movie: Movie): Observable<Object> {
    return this.httpClient.put<Movie>(`${this.baseURL}/updateMovie`, Movie);
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.httpClient.delete<Movie>(`${this.baseURL}/deleteMovieById/${id}`);
  }

  searchMovie(searchKeyword: any): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.baseURL}/searchMovie/${searchKeyword}`);
  }
}
