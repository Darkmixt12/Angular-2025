import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../../shared/components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../../shared/components/country-list/country-list.component";

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent { 

   receivedMessage = signal<string>('');
   

  consoleEventEmitter(output: string){
    this.receivedMessage.set(output)
  }

}

