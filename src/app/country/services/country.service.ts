import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/country-interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>()
  private queryCacheCountry = new Map<string, Country[]>()
  private queryCacheRegion = new Map<string, Country[]>()


  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();


    if(this.queryCacheCapital.has(query)) {
      return of( this.queryCacheCapital.get(query)?? [])
    }

    console.log(`Lllegando al servidor por ${query}`)


    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      tap( countries => this.queryCacheCapital.set(query, countries)),
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

    if(this.queryCacheCountry.has(query)) {
      return of( this.queryCacheCountry.get(query)?? [])
    }

    console.log(`Lllegando al servidor por ${query}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
       tap( countries => this.queryCacheCountry.set(query, countries)),
      delay(1000),
      catchError((error) => {
        return throwError(
          () =>
            new Error(`No se han encontrado paises relacionados a "${query}"`)
        );
      })
    );
  }


  searchByRegion(query: string): Observable<Country[]>{
    //https://restcountries.com/v3.1/region/europe
    query = query.toLocaleLowerCase();
    const url = `${API_URL}/region/${query}`

    if(this.queryCacheRegion.has(query)) {
      return of( this.queryCacheRegion.get(query)?? [])
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((restCountries) => 
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
    ),
    tap( countries => this.queryCacheRegion.set(query, countries)),
    delay(1000),
    catchError((error) => {
      return throwError (
        () =>
          new Error('No se ha encontrado region')
      )
    }))
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
