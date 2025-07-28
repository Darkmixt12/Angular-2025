import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CountryListComponent } from "../../../shared/components/country-list/country-list.component";
import { CountrySearchInputComponent } from "../../../shared/components/country-search-input/country-search-input.component";

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {

   receivedMessage = signal<string>('');
   

  consoleEventEmitter(output: string){
    this.receivedMessage.set(output)
  }

 }
