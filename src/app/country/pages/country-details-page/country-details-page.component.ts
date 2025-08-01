import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop'
import { CountryService } from '../../services/country.service';
@Component({
  selector: 'app-country-details-page',
  imports: [],
  templateUrl: './country-details-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailsPageComponent { 

countryCode = inject(ActivatedRoute).snapshot.params['code']
countryService = inject(CountryService)


countryResource = rxResource({
  params: () => ({ code: this.countryCode}),
  stream: ({params}) => {
      return this.countryService.searchCountryByAlphaCode(params.code)
  }


})


 }
