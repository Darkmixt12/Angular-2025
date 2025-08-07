import { ChangeDetectionStrategy, Component, effect, EventEmitter, input, linkedSignal, output, Output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {

messageEvent = output<string>()
placeholder = input('Buscar')
  initialValue = input<string>();
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

debounceEffect = effect( (onCleanup) => {

  const value = this.inputValue()

  const timeout = setTimeout( () => {
    this.messageEvent.emit(value)
  }, 500 )


  onCleanup(() => {
    clearTimeout(timeout)
  })

} )
  // onSearch(value: string): void {
  //   this.messageEvent.emit(value)
  // }




}
