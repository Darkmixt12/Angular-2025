import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
  WritableSignal,
} from '@angular/core';
import { CountryListComponent } from '../../../shared/components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../../shared/components/country-search-input/country-search-input.component';
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

export type Region =
  | 'Africa'
  | 'America'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';


  function validateQueryParam(regionQuery: string): Region{
    regionQuery = regionQuery.toLocaleLowerCase()

    const validRegions: Record<string, Region> = {
    'africa' : 'Africa',
    'america': 'America',
    'asia': 'Asia',
    'aurope': 'Europe',
    'oceania': 'Oceania',
    'antarctic' : 'Antarctic',
    }

    return validRegions[regionQuery] ?? 'America'
  }

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {
  receivedMessage = signal<string>('');
  _countryService = inject(CountryService);
  
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') as Region
  selectedRegion = linkedSignal<Region>( () => validateQueryParam(this.queryParam) )

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
    params: () => ({ region: this.selectedRegion() }),
    loader: async ({ params }) => {
      if (!params.region) return [];

    this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: params.region
        }
      })

      return await firstValueFrom(
        this._countryService.searchByRegion(params.region)
      );
    },
  });
}
