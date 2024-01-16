import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputNonNegative]'
})
export class InputNonNegativeDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    
    const initialValue = this.el.nativeElement.value;

    // Remove minus sign and update the input value
    this.el.nativeElement.value = initialValue.replace(/[^0-9]/g, '');

    // Emit a change event to make sure Angular recognizes the input change
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
