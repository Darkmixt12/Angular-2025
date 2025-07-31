import {
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
  signal,
} from '@angular/core';
import { CountrySearchInputComponent } from '../../../shared/components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../../shared/components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country-interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  receivedMessage = signal<string>('');
  _countryService = inject(CountryService);
  query = signal('');

  // isLoading = signal(false)
  // isError = signal<string|null>(null)
  // countries = signal<Country[]>([])

  // consoleEventEmitter(output: string){
  // if(this.isLoading()) return

  //   this.isLoading.set(true)
  //   this.isError.set(null)
  //   this._countryService.searchByCapital(output).subscribe( {
  //     next: (countries) => {
  //       this.isLoading.set(false)
  //       this.countries.set(countries)
  //   },
  //     error: ( err ) => {
  //       this.isLoading.set(false)
  //       this.countries.set([])
  //       this.isError.set(err)
  //     }
  // })
  //  }

  // Permite integrar data asyc utilizando señales que normalmente sus API son sync
  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];

      return await firstValueFrom(
        this._countryService.searchByCapital(params.query)
      );
    },
  });
}


