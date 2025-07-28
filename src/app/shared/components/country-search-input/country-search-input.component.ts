import { ChangeDetectionStrategy, Component, EventEmitter, input, output, Output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {

messageEvent = output<string>()
placeholder = input('Buscar')


  // onSearch(value: string): void {
  //   this.messageEvent.emit(value)
  // }


}
