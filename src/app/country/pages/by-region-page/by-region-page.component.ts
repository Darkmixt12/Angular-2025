import {
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
  signal,
  WritableSignal,
} from '@angular/core';
import { CountryListComponent } from '../../../shared/components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../../shared/components/country-search-input/country-search-input.component';
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country.service';

export type Region =
  | 'Africa'
  | 'America'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {
  selectedRegion = signal<Region | null>(null);
  receivedMessage = signal<string>('');
  _countryService = inject(CountryService);

  public regionsList: Region[] = [
    'Africa',
    'America',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  consoleEventEmitter(output: string) {
    this.receivedMessage.set(output);
    console.log(output);
  }

  regionResource = resource({
    params: () => ({ query: this.selectedRegion() }),
    loader: async ({ params }) => {
      if (!params.query) return [];

      return await firstValueFrom(
        this._countryService.searchByRegion(params.query)
      );
    },
  });
}
