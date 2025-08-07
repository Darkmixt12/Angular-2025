import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { CountrySearchInputComponent } from '../../../shared/components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../../shared/components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  _countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute)
  query = linkedSignal(() => this.queryParam);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  router = inject(Router)

  


  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];
      
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: params.query
        }
      })

      return await firstValueFrom(
        this._countryService.searchByCountry(params.query)
      );
    },
  });
}
