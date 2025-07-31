import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../../country/interfaces/rest-countries.interfaces';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent { 


  countries = input.required<RESTCountry[]>()

}
