import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../../shared/components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../../shared/components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

   receivedMessage = signal<string>('');
   _countryService = inject(CountryService)

  isLoading = signal(false)
  isError = signal<string|null>(null)
  countries = signal<RESTCountry[]>([])

  consoleEventEmitter(output: string){
  if(this.isLoading()) return

    this.isLoading.set(true)
    this.isError.set(null)
    this._countryService.searchByCapital(output).subscribe( (countries) => {
      this.isLoading.set(false)
      this.countries.set(countries)
      console.log(countries)
    } )
  }


 }
