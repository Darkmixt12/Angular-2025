import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { Country } from '../interfaces/country-interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      catchError((error) => {
        return throwError(
          () =>
            new Error(`No se han encontrado paises relacionados a "${query}"`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      delay(1500),
      catchError((error) => {
        return throwError(
          () =>
            new Error(`No se han encontrado paises relacionados a "${query}"`)
        );
      })
    );
  }

    searchCountryByAlphaCode(code: string){

      const url = `${API_URL}/alpha/${code}`

    return this.http.get<RESTCountry[]>(url).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      map( (countries) => countries.at(0)),
      catchError((error) => {
        return throwError(
          () =>
            new Error(`No se han encontrado paises relacionados a "${code}"`)
        );
      })
    );
  }
}
