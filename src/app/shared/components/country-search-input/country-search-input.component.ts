import { ChangeDetectionStrategy, Component, effect, EventEmitter, input, output, Output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {

messageEvent = output<string>()
placeholder = input('Buscar')

inputValue = signal<string>('')

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
